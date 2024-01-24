#!/bin/bash
# Run table seeder sql scripts for LSA database

# Run database initialization
# NOTE: run command 'chmod +x db_init.sh' on host to make this file executable in Docker container
# sh db_init.sh

declare -a tables=(
    'user_roles' 
    'milestones' 
    'qualifying_years' 
    'organizations' 
    'communities' 
    'provinces' 
    'pecsf_regions' 
    'pecsf_charities' 
    'awards' 
    'award_options'
    'settings'
    )
INIT_DIR=/docker-entrypoint-initdb.d

PGPASSWORD=$POSTGRESQL_PASSWORD 

# clear and initialize database
 (
 echo "DROP SCHEMA PUBLIC CASCADE;";
 echo "CREATE SCHEMA PUBLIC;";
 echo "SET TIME ZONE 'US/Pacific'";
 ) \
 | psql -U $POSTGRESQL_USERNAME $POSTGRESQL_DATABASE

psql -U $POSTGRESQL_USERNAME $POSTGRESQL_DATABASE < $INIT_DIR/lsa_data.sql;

# execute seeders
echo "Seeding tables...";
for t in "${tables[@]}"
do
    echo "$t"
    psql -U $POSTGRESQL_USERNAME $POSTGRESQL_DATABASE -a -f $INIT_DIR/$t.sql;
done

# In some cases, the Awards and PECSF charity tables do not populate (inserts fail silently)
# - to fix this, manually run the following on the container (password required):
# psql -U $POSTGRESQL_USERNAME $POSTGRESQL_DATABASE -a -f /docker-entrypoint-initdb.d/awards.sql;
# psql -U $POSTGRESQL_USERNAME $POSTGRESQL_DATABASE -a -f /docker-entrypoint-initdb.d/award_options.sql;
# psql -U $POSTGRESQL_USERNAME $POSTGRESQL_DATABASE -a -f /docker-entrypoint-initdb.d/pecsf_charities.sql;

echo "LSA db initialization completed.";

#eof