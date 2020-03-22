#!/bin/bash
set -e
mongo <<EOF
use ${MONGO_INITDB_DATABASE};
db.createUser(
  {
    user: "${MONGO_NON_ROOT_USERNAME}",
    pwd: "${MONGO_NON_ROOT_PASSWORD}",
    roles: [
      {
        role: "readWrite",
        db: "${MONGO_INITDB_DATABASE}"
      }
    ]
  }
);
db.createCollection("tickets");
EOF