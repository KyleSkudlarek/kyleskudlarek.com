all:
	@gatsby develop

build:
	@gatsby build

deploy: build
	@npm run deploy