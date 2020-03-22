# ASK
Administracja systemów komputerowych
# Running the app
* `make build-dev`
* `docker compose up`

# Acessing OpenLDAP server
## Getting IP
To access GUI overlay, enter phpldapadmin IP to your browser (in place of phpldapadmin insert container name instantiated by your docker compose):
* `docker inspect phpldapadmin | grep "IPAddress"`
## Credentials:
* login: `cn=admin,dc=askproject,dc=com`
* password: `admin`