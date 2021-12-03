-include .env
export

DOCKER_REGISTRY ?= registry.ubicast.net
DOCKER_IMG ?= ${DOCKER_REGISTRY}/web/ng-navigation-poc

CI_PIPELINE_ID ?= 1

TMP_DOCKER_CT ?= ng-navigation-poc-ct-${CI_PIPELINE_ID}

BROWSER_NAME ?= chrome

BROWSERSTACK_USER ?= required_for_bs

BROWSERSTACK_ACCESS_KEY ?= required_for_bs

install_deps:
	npm set progress=false
	test -d node_modules || npm clean-install --no-audit > /dev/null

serve: install_deps
	npm start -- --host 0.0.0.0 --port 8000 --disable-host-check

build_angular:
ifndef CI
	$(MAKE) run_container
	docker exec -e CI=1 -t ${TMP_DOCKER_CT} make build_angular
else
	npm clean-install
	npm run build
endif

lint:
ifndef CI
	$(MAKE) run_container
	docker exec -e CI=1 -t ${TMP_DOCKER_CT} make lint
else
	$(MAKE) install_deps
	npm run lint
endif

test:
ifndef CI
	$(MAKE) run_container
	docker exec -e CI=1 -t ${TMP_DOCKER_CT} make test
else
	npm clean-install-test --no-cache --debug
endif

test_browser:
ifndef IN_CONTAINER
	$(MAKE) run_container
	docker exec -d ${TMP_DOCKER_CT} make serve
	@echo "Wait 20s dev server start"
	sleep 20
	docker exec -e IN_CONTAINER=1 -t ${TMP_DOCKER_CT} make test_browser BROWSER_NAME=${BROWSER_NAME}
else
	npm run e2e-${BROWSER_NAME}
endif

test_browser_local:
	$(MAKE) run_container
	docker exec -d ${TMP_DOCKER_CT} make serve
	@echo "Wait 20s dev server start"
	sleep 20
	npm run e2e-local

run: run_container
	docker exec -it ${TMP_DOCKER_CT} make serve

run_container:
	docker container rm -f ${TMP_DOCKER_CT}; \
	docker run -dit ${DOCKER_EXTRA_ARGS} \
		-e BROWSERSTACK_USER=${BROWSERSTACK_USER} \
		-e BROWSERSTACK_ACCESS_KEY=${BROWSERSTACK_ACCESS_KEY} \
		--hostname=ng-navigation-poc \
		-v ${CURDIR}:/ui \
		-p 8000:8000 \
		--name ${TMP_DOCKER_CT} --rm ${DOCKER_IMG}

build_docker_img:
	docker build -t ${DOCKER_IMG} --no-cache -f docker/Dockerfile .

pull_docker_img:
	docker pull ${DOCKER_IMG}

publish_docker_img: build_docker_img
	docker push ${DOCKER_IMG}

stop:
	$(MAKE) clean_docker

clean:
	rm -rf dist/ .npm/ node_modules/

clean_docker:
	docker top ${TMP_DOCKER_CT} &> /dev/null && docker exec -t ${TMP_DOCKER_CT} make clean || true
	$(MAKE) kill_docker

kill_docker:
	docker kill ${TMP_DOCKER_CT} || true
	docker rm ${TMP_DOCKER_CT} || true