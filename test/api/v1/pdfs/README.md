# Debugging:

### Rebuilding Docker Image:
docker build -t emailgate-worker .

### ssh into running container
docker exec -i -t e5b60d711d1b /bin/bash

## gulp-es6-webpack-example

docker kill emailgate-worker
docker rm emailgate-worker
docker build -t emailgate-worker .
docker run -t -i --env-file ./.env emailgate-worker /bin/bash

docker run -t -i -v /Users/nmajor/dev/emailgate-worker/:/var/host --env-file ./.env emailgate-worker /bin/bash


### ssh into running container
docker exec -i -t e5b60d711d1b /bin/bash

### copy file from running container
docker cp 54d2a842227b:/tmp/compilation/compilation-S1qKd-3AZ.pdf ~/tmp

### TODOs

- Download the emails and stuff using manta instead of http requests.



> phantomjs-prebuilt@2.1.7 install /var/app/node_modules/phantomjs-prebuilt
> node install.js

PhantomJS not found on PATH
Downloading https://github.com/Medium/phantomjs/releases/download/v2.1.1//phantomjs-2.1.1-linux-x86_64.tar.bz2
Saving to /var/app/node_modules/phantomjs-prebuilt/phantomjs/phantomjs-2.1.1-linux-x86_64.tar.bz2
Receiving...

### Tasks

- Generate Email pdfs
- Generate Page pdfs
- Generate Page Number pdfs
- Compile the whole compilation document

### Docker Notes

- This will give the env variables to connect to the docker-machine
$ docker-machine env default

export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="/Users/nmajor/.docker/machine/machines/default"
export DOCKER_MACHINE_NAME="default"
# Run this command to configure your shell:
# eval "$(docker-machine env default)"

curl https://192.168.99.100:2376/images/json \
  --cert ~/.docker/machine/machines/default/cert.pem \
  --key ~/.docker/machine/machines/default/key.pem \
  --cacert ~/.docker/machine/machines/default/ca.pem


docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

### Demo tasks for .env file
build-email-pdfs (5emails) TASK=eyJuYW1lIjoiYnVpbGQtZW1haWwtcGRmcyIsInByb3BzIjp7ImVtYWlsSWRzIjpbInJKWFF2bHpVZSIsIkh5R0pfM1ZsIiwiSGtkSnUzNGUiLCJySjdEbGZVZyIsInIxbFh3bHpMbCJdLCJjb21waWxhdGlvbklkIjoiSGtCMGlyTWcifX0=

build-page-pdfs TASK=eyJuYW1lIjoiYnVpbGQtcGFnZS1wZGZzIiwicHJvcHMiOnsicGFnZUlkcyI6WyJTMVdTMG9TTXgiLCJTMWZCMGpTTXgiLCJISmxTQ3NyR2ciLCJySjdIUm9yTXgiXSwiY29tcGlsYXRpb25JZCI6IkhrQjBpck1nIn19

build-compilation-pdf TASK=eyJuYW1lIjoiYnVpbGQtY29tcGlsYXRpb24tcGRmIiwicHJvcHMiOnsiY29tcGlsYXRpb25JZCI6IkhrQjBpck1nIiwiZW1haWxQb3NpdGlvbk1hcCI6eyJTMWhYN3dsR0lnIjowLCJTeWJON0RlTUx4IjoxLCJCMTBFbXZlZkxlIjoyLCJIMTU0N3d4TVVlIjozLCJCMWQ3bVBlelV4Ijo0LCJCeXdWUXZlTUxlIjo1LCJCeTJWUVBlZlVlIjo2LCJIMVk3UVB4eklsIjo3LCJTMTY0WFBlekxnIjo4LCJTMXRWN3d4TUl4Ijo5LCJCMUNYN0RlR0x4IjoxMCwicmt2em1QZ004ZyI6MTEsIlMxcjRYdmdHOHgiOjEyLCJIa3VOUXZsejhlIjoxMywicjF4Tm1EZ01JZyI6MTQsIkhrUDdRd3h6VXgiOjE1LCJySnJXUURsZkx4IjoxNiwicmtNTjdQZ2ZVZyI6MTcsIlNrSTQ3UGdmOHgiOjE4LCJTeVRNUXZnTVVnIjoxOSwiQkpxUTd2eEc4ZSI6MjAsInJ5WU1YRGx6THgiOjIxLCJCSmVTbVB4ZkllIjoyMiwiQms3TlFEZ0dMbCI6MjMsInJKTlFYUHhNOGciOjI0LCJyeVNtWER4TTh4IjoyNSwiSHlzN1FQbGY4ZSI6MjYsIlNKNEU3RGdNTGciOjI3LCJCazFYWFBlRzhsIjoyOCwiU0pJWFFQZ3o4ZyI6MjksIkJKWDdtd3hmVXgiOjMwLCJyeWtmUXZ4eklsIjozMSwiSHk2V1hEbEdJZyI6MzIsIlMxOEdRd2dNOHgiOjMzLCJTa1d6bUR4ZjhsIjozNCwiQjEwTVh2bE04eCI6MzUsIkJKWlNtRGV6TGciOjM2LCJTa054UVBsR0lsIjozNywiQjFhWFFQeE1VZSI6MzgsIkJrMTRRUHhHSWwiOjM5LCJTeWp6WHZlZkl4Ijo0MCwiSHlxRzdEZXpJeCI6NDEsIkgxa3JtUGxmTHgiOjQyLCJTMW9iWHdnRzhsIjo0MywiU0ozLW13ZXpMbCI6NDQsIkJrbFhRUGxNVWUiOjQ1LCJCa3pYUXd4R1V4Ijo0NiwicmtwbFF2bGZVeCI6NDcsInJraGY3dmV6OGciOjQ4LCJCeTUtbURsZkxsIjo0OSwiSEpLV1h2eGZVbCI6NTAsIlN5bVptRGV6OGciOjUxLCJya1VXWFBnTUllIjo1MiwiU3lIZm13Z01MbCI6NTMsIlMxaGVRd2d6OHgiOjU0LCJTa2VNN1BlZlVlIjo1NSwiU3lNcjd3bHpJZyI6NTYsIlNKei1tRGxmSXgiOjU3LCJIMXdaWERnZkxsIjo1OCwicmtiN213bE1VZSI6NTksIlMxNFdRd3hHSWciOjYwLCJCSnNsUVB4TUl4Ijo2MSwiU3ktYjdEbGZVbCI6NjIsInIxTU1RUGdmSWciOjYzLCJya0lYdmdHOGciOjY0LCJCSmRaN3d4R1VsIjo2NSwiQkpkZm1EbE1MeCI6NjYsIkIxN01tUGdmVWwiOjY3LCJTeXF4WHdnRzhlIjo2OCwiSHkxeFF3Z004ZyI6NjksInJKc05tRGxmTGciOjcwLCJyeUNibXd4R1VnIjo3MSwiSDFfeFFQbEdVbCI6NzIsIkJKVk1YdmV6OGUiOjczLCJTa3ZYdmV6SWciOjc0LCJySkU3dmVHOGwiOjc1LCJTSjEtbXdnRzhnIjo3NiwiSDFCeDdQbE1MeCI6NzcsIlNrTGdRd2xmSWciOjc4LCJyeVdlUURlTUl4Ijo3OSwiSGtabVBsTVVnIjo4MCwiU0pSZVF3eEdVeCI6ODEsIlNKd2dtUGdHVWwiOjgyLCJya0NRRGVNSWUiOjgzLCJIMU9YRGdNSWUiOjg0LCJySlhRdmx6VWUiOjg1LCJCeUtnN1B4TUx4Ijo4NiwiQjFsWlF2eGZVZyI6ODcsIkIxR3g3UHhNVWciOjg4LCJTSkdtUGVNOGciOjg5LCJCa1lYRGdHTGwiOjkwLCJCMW5Rd2dmVXgiOjkxLCJCMXBtd2d6VWUiOjkyLCJIeUdKXzNWbCI6OTMsInIxbFh3bHpMbCI6OTQsIlN5bHhtRHhHOGwiOjk1LCJIMTdsWFB4ZlVsIjo5NiwiSGtkSnUzNGUiOjk3LCJISnNRd2VNVXgiOjk4LCJCSmNYRGdHTHgiOjk5LCJIeXJRUGd6VWwiOjEwMCwicko3RGxmVWciOjEwMX0sInBhZ2VQb3NpdGlvbk1hcCI6eyJISmxTQ3NyR2ciOjAsIlMxV1Mwb1NNeCI6MSwiUzFmQjBqU014IjoyLCJySjdIUm9yTXgiOjN9fX0=
