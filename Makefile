-include .env
export

DOCKER_REGISTRY ?= registry.ubicast.net
DOCKER_IMG ?= ${DOCKER_REGISTRY}/mediaserver/boilerplate-angular

DOCKER_PORT ?= 4200

CI_PIPELINE_ID ?= 1

TMP_DOCKER_CT ?= boilerplate-angular-ct-${CI_PIPELINE_ID}


install_deps:
	npm set progress=false
	test -d node_modules || npm clean-install --no-audit > /dev/null

build: install_deps
	npm run build

serve: install_deps
	npm start -- --host 0.0.0.0

lint: install_deps
ifndef CI
	docker exec -e CI=1 -t ${TMP_DOCKER_CT} make lint
else
	npm run lint
endif

test:
ifndef CI
	docker exec -e CI=1 -t ${TMP_DOCKER_CT} make test
else
	npm clean-install-test --no-cache --debug
endif

test_browser:
ifndef IN_CONTAINER
	docker exec -t ${TMP_DOCKER_CT} make test_browser BROWSER_NAME=${BROWSER_NAME}
else
	npm run e2e-${BROWSER_NAME}
endif

test_browser_local:
	npm run e2e-local

clean:
	rm -rf dist/ .npm/ node_modules/

run:
	docker container stop ${TMP_DOCKER_CT}; \
	docker run -dit ${DOCKER_EXTRA_ARGS} \
		--hostname=boilerplate-angular \
		-v ${CURDIR}:/ui \
		-p ${DOCKER_PORT}:4200 \
		--name ${TMP_DOCKER_CT} --rm ${DOCKER_IMG}
	docker exec -it ${TMP_DOCKER_CT} make serve

build_docker_img:
	docker build -t ${DOCKER_IMG} -f docker/Dockerfile .

pull_docker_img:
	docker pull ${DOCKER_IMG}

publish_docker_img: build_docker_img
	docker push ${DOCKER_IMG}