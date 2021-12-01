APP_NAME = channels-navigation
PORT = 4200

test_browser_local:
	docker run -it \
	-v ${CURDIR}:/ui \
	--rm ${APP_NAME}:dev \
	chown -R root /root/.npm && \
	npm run ci

run_serve:
	docker run -it \
	--name dev-serve \
	-v ${CURDIR}:/ui \
	-p $(PORT):$(PORT) \
	--rm ${APP_NAME}:dev \
	ng serve --host 0.0.0.0

shell:
	docker run -it \
		-v ${CURDIR}:/ui \
		-p $(PORT):$(PORT) \
		--rm ${APP_NAME}:dev \
		/bin/bash


build_docker_img:
	docker build -t $(APP_NAME):dev -f docker/Dockerfile .

clean_docker_img:
	docker rmi $(APP_NAME):dev

stop:
	$(MAKE) clean_docker

clean:
	rm -rf dist/ .npm/ node_modules/

clean_docker:
	docker top ${APP_NAME}:dev &> /dev/null && docker exec -t ${APP_NAME}:dev \
	make clean || true \
	$(MAKE) kill_docker

kill_docker:
	docker kill ${APP_NAME} || true
	docker rm ${APP_NAME} || true