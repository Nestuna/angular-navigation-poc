-include .env
export

DOCKER_REGISTRY ?= registry.ubicast.net
DOCKER_IMG ?= ${DOCKER_REGISTRY}/mediaserver/boilerplate-angular

DOCKER_PORT ?= 4200

CI_PIPELINE_ID ?= 1

TMP_DOCKER_CT ?= boilerplate-angular-ct-${CI_PIPELINE_ID}

BROWSER_NAME ?= chrome

install_deps:
	npm set progress=false
	test -d node_modules || npm clean-install --no-audit > /dev/null

serve: install_deps
	npm start -- --host 0.0.0.0 --disable-host-check

build_angular:
ifndef CI
	docker exec -e CI=1 -t ${TMP_DOCKER_CT} make build_angular
else
	npm clean-install
	npm run build
endif

lint:
ifndef CI
	docker exec -e CI=1 -t ${TMP_DOCKER_CT} make lint
else
	$(MAKE) install_deps
	npm run lint
endif

test:
ifndef CI
	docker exec -e CI=1 -t ${TMP_DOCKER_CT} make test
else
	npm clean-install-test --no-cache --debug
endif

test_browser:
ifndef CI
	$(MAKE) run_container
	docker exec -d ${TMP_DOCKER_CT} make serve
	docker exec -e CI=1 -t ${TMP_DOCKER_CT} make test_browser BROWSER_NAME=${BROWSER_NAME}
else
	npm run e2e-${BROWSER_NAME}
endif

test_browser_local: run_container
	docker exec -d ${TMP_DOCKER_CT} make serve
	@echo "Wait 20s dev server start"
	sleep 20
	npm run e2e-local

run: run_container
	docker exec -it ${TMP_DOCKER_CT} make serve

run_container:
	docker container stop ${TMP_DOCKER_CT}; \
	docker run -dit ${DOCKER_EXTRA_ARGS} \
		--hostname=boilerplate-angular \
		-v ${CURDIR}:/ui \
		-p ${DOCKER_PORT}:4200 \
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