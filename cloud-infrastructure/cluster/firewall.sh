IP_ADDRESS=$(curl -s https://api.ipify.org)
FIREWALL_RULE_NAME="GitHub Action Workflows - ${SQL_DATABASE_NAME} - Only active when deploying"

if [[ "$1" == "open" ]]
then
    echo "$(date +"%Y-%m-%dT%H:%M:%S") Add the IP $IP_ADDRESS to the SQL Server firewall on server $SQL_SERVER_NAME for database $SQL_DATABASE_NAME"
    az sql server firewall-rule create --resource-group $RESOURCE_GROUP_NAME --server $SQL_SERVER_NAME --name "$FIREWALL_RULE_NAME" --start-ip-address $IP_ADDRESS --end-ip-address $IP_ADDRESS
else
    echo "$(date +"%Y-%m-%dT%H:%M:%S") Delete the IP $IP_ADDRESS from the SQL Server firewall on server $SQL_SERVER_NAME for database $SQL_DATABASE_NAME"
    az sql server firewall-rule delete --resource-group $RESOURCE_GROUP_NAME --server $SQL_SERVER_NAME --name "$FIREWALL_RULE_NAME"
fi
