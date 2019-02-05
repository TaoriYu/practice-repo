#! /usr/bin/env bash

CODEGEN_VERSION="2.3.1";
MAVEN_REPO="http://central.maven.org/maven2/io/swagger/swagger-codegen-cli"
CODEGEN_URL="$MAVEN_REPO/$CODEGEN_VERSION/swagger-codegen-cli-$CODEGEN_VERSION.jar";

CLI_PATH="./codegen/swagger-codegen-cli.jar";
RED='\033[0;31m';
NC='\033[0m';
GREEN='\033[0;32m';
BOLD='\033[1m';

if  command -v java &> /dev/null; then
  if [[ -f ./types/swagger.d.ts ]]; then
    echo -e "${RED}ERROR WHILE GENERATION${NC}"
    echo -e "${BOLD}swagger.d.ts${NC} already exists in ./types, please delete or rename it";
    exit 1;
  fi
  mkdir codegen;
  echo "checking central.maven.org for codegen utility";
  curl ${CODEGEN_URL} > ${CLI_PATH};
  if [[ ! -f ${CLI_PATH} ]]; then
    echo -e "${RED}ERROR WHILE GENERATION${NC}"
    echo -e "couldn't download ${BOLD}swagger-codegen-cli${NC}";
    echo "requested url $CODEGEN_URL";
    rm -rf codegen;
    exit 1;
  fi
  java -jar ${CLI_PATH} generate \
  -l typescript-aurelia \
  -i $@ \
  -o ./result/all 2> ./codegen-error.log;
  if [[ ! -f ./result/all/models.ts ]]; then
    echo -e "${RED}ERROR WHILE GENERATION${NC}"
    echo "couldn't generate model. Maybe swagger not valid?";
    echo -e "check ${BOLD}codegen-error.log${NC} for more information about error";
    rm -rf codegen;
    exit 1;
  fi
  rm ./codegen-error.log
  sed -i .back \
  -e '1,12d' `#remove copyright` \
  -e 's/^export //g' `# remove export keyword before the interface` \
  -e '$d' `# delete last trailing line` \
  ./result/all/models.ts;
  mv ./result/all/models.ts ./types/swagger.d.ts;
  rm -rf ./result;
  rm -rf codegen;
  echo -e "${GREEN}SUCCESS${NC}"
  echo -e "you could find your models in ${BOLD}./types/swagger.d.ts${NC}"
  echo -e "${BOLD} before using you must rename it! ${NC}"
  exit 0;
else
  echo -e "you need to install java ${BOLD}https://www.java.com/en/download/${NC}";
  exit 1;
fi
