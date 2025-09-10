#!/bin/sh
set -e

# Wait for Geth JSON-RPC to be ready without needing curl/wget
echo "Waiting for geth JSON-RPC to respond..."
until geth attach --exec "eth.blockNumber" http://geth:8545 >/dev/null 2>&1; do
  sleep 0.5
done

echo "Geth JSON-RPC is responding!"

geth attach --exec 'loadScript("/scripts/prefund.js")' http://geth:8545

echo "Finished prefunding the account."

touch /shared/geth-init-complete
