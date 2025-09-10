# Local development environment setup

Your goal is to successfully set up a local environment running on Docker Compose, comprising of:
- **caddy**: reverse proxy. You need to route origins of exposed ports inside Docker to a single origin with the same port. For example, if your EVM node's RPC service is running at localhost:5000 and explorer at localhost:6000, you want to route them as https://myorigin.com/rpc and https://myorigin.com/explorer.
- **ngrok**: tunnel. Sign up for ngrok and go to https://dashboard.ngrok.com/domains and get your own domain. Use the auth token and domain to tunnel your local environment to the Internet.
- **Smart contracts deployer**: this is an ephemeral container that `git clone`s your assignment 1A and runs the deployment script against your local EVM node, and then shuts down.
- **Smart contracts deployment server (caddy)**: contains information on the deployment (contract addresses). Use Caddy and very simple Caddyfile to host a web server on a [json file in this format](./example-deployment.json) containing deployed contract addresses. This file should be created by smart contracts deployer.
- **EVM node (geth)**: runs a blockchain. Just ask AI to write the entrypoint script for you.
- **Geth initialization script**: preconfigures blockchain environment. Write a short `prefund.js` script to prefund accounts for which you know the private keys, so you can use them freely. [Refer to this documentation](https://geth.ethereum.org/docs/interacting-with-geth/javascript-console#interactive-use).
- **Explorer (blockscout)**: UI to see transactions and other data. [Refer to this documentation](https://docs.blockscout.com/setup/deployment/docker-compose-deployment). Also remember that you can run two docker compose files at the same time. Blockscout needs to be connected to the local EVM node to index blockchain data. Once Blockscout is up, you will be able to see [something like this](https://coston2-explorer.flare.network/).
- **Graph stack**: indexes blockchain data & query. It consists of multiple containers (ipfs, postgres, redis, graph node). Graph node needs to be connected to ipfs, redis, postgres, and EVM node. A successful deployment would expose a GraphQL query playground that looks like something like this: https://api.goldsky.com/api/public/project_cl6mb8i9h0003e201j6li0diw/subgraphs/orderbook-subgraph/0.0.1/gn. But for now, the Graph stack does not need to index any data or host any subgraph, so you will only see **"Access deployed subgraphs by deployment ID at /subgraphs/id/<ID> or by name at /subgraphs/name/<NAME>"**. This is an expected behavior.

Each endpoint should be accessible via ngrok according to the following spec:

- Smart contracts deployment server: https://yourorigin.com/deployment
- Explorer: https://yourorigin.com/explorer
- EVM Node (RPC service): https://yourorigin.com/rpc
- Graph node GraphQL query playground: https://yourorigin.com/graph-playground

## Hints

- If something doesn't seem to be working but you don't know which container is causing the problem, try commenting out each container at a time.
- You don't have to understand every single construct on Docker Compose or every option/flag supplied to each container. As long as it works, it's fine.
- Try to leverage AI as much as possible. Use AI for the big picture, and use your manual debugging skills to resolve specific problems.
- An example repository with a slightly different configuration is at https://github.com/9oelM/xrpl-axelar-local-dev. This simulates a local EVM node connected via Axelar to an XRPL node, with other additional services.


# 로컬 개발 환경 설정

당신의 목표는 Docker Compose를 사용하여 다음과 같은 구성 요소를 포함한 로컬 환경을 성공적으로 구축하는 것입니다:

* **caddy**: 리버스 프록시. Docker 내부에서 노출된 포트들을 단일 오리진(origin)과 동일한 포트로 라우팅해야 합니다. 예를 들어, EVM 노드의 RPC 서비스가 `localhost:5000`에서 실행되고, 익스플로러가 `localhost:6000`에서 실행 중이라면, 이들을 각각 `https://myorigin.com/rpc` 및 `https://myorigin.com/explorer`로 라우팅해야 합니다.

* **ngrok**: 터널. ngrok에 가입하고 [ngrok 대시보드](https://dashboard.ngrok.com/domains)에서 본인의 도메인을 받아옵니다. 인증 토큰과 도메인을 사용해 로컬 환경을 인터넷에 터널링하세요.

* **스마트 컨트랙트 배포기 (ephemeral container)**: `git clone`으로 과제 1A를 가져온 뒤, 로컬 EVM 노드에 배포 스크립트를 실행하고 종료하는 일회성 컨테이너입니다.

* **스마트 컨트랙트 배포 서버 (caddy)**: 배포된 컨트랙트 주소 정보를 담습니다. 간단한 Caddyfile을 사용해 [이 예시 형식](./example-deployment.json)의 JSON 파일(배포된 컨트랙트 주소 포함)을 호스팅하는 웹 서버를 구동합니다. 이 파일은 스마트 컨트랙트 배포기가 생성합니다.

* **EVM 노드 (geth)**: 블록체인을 실행합니다. 엔트리포인트 스크립트는 AI에게 작성 요청하세요.

* **Geth 초기화 스크립트**: 블록체인 환경을 사전 구성합니다. `prefund.js`라는 짧은 스크립트를 작성하여 개인 키를 알고 있는 계정을 미리 자금 지원(prefund)하세요. 이렇게 하면 자유롭게 사용할 수 있습니다. [참고 문서](https://geth.ethereum.org/docs/interacting-with-geth/javascript-console#interactive-use)를 확인하세요.

* **Explorer (blockscout)**: 트랜잭션 및 기타 데이터를 확인할 수 있는 UI. [참고 문서](https://docs.blockscout.com/setup/deployment/docker-compose-deployment). 동시에 두 개의 Docker Compose 파일을 실행할 수 있다는 점을 기억하세요. Blockscout은 로컬 EVM 노드와 연결되어 블록체인 데이터를 인덱싱해야 합니다. Blockscout이 실행되면 [이런 화면](https://coston2-explorer.flare.network/)을 볼 수 있습니다.

* **Graph stack**: 블록체인 데이터를 인덱싱하고 쿼리합니다. 여러 컨테이너(ipfs, postgres, redis, graph node)로 구성됩니다. Graph node는 ipfs, redis, postgres, EVM 노드와 연결되어야 합니다. 정상적으로 배포되면 GraphQL 쿼리 플레이그라운드가 노출되며, 대략 [이 예시](https://api.goldsky.com/api/public/project_cl6mb8i9h0003e201j6li0diw/subgraphs/orderbook-subgraph/0.0.1/gn)처럼 보입니다. 하지만 지금은 Graph stack이 데이터를 인덱싱하거나 서브그래프를 호스팅할 필요는 없으므로 **"Access deployed subgraphs by deployment ID at /subgraphs/id/<ID> or by name at /subgraphs/name/<NAME>"** 메시지가 뜨는 것이 정상 동작입니다.

각 엔드포인트는 ngrok을 통해 다음 스펙에 맞게 접근 가능해야 합니다:

* 스마트 컨트랙트 배포 서버: `https://yourorigin.com/deployment`
* 익스플로러: `https://yourorigin.com/explorer`
* EVM 노드 (RPC 서비스): `https://yourorigin.com/rpc`
* Graph node GraphQL 쿼리 플레이그라운드: `https://yourorigin.com/graph-playground`

---

## 힌트

* 어떤 컨테이너에서 문제가 발생했는지 모르겠다면, 컨테이너를 하나씩 주석 처리하며 확인하세요.
* Docker Compose의 모든 옵션이나 각 컨테이너의 플래그를 완벽히 이해할 필요는 없습니다. 작동만 하면 괜찮습니다.
* 가능한 한 AI를 많이 활용하세요. 큰 그림은 AI에게 맡기고, 세부적인 문제는 직접 디버깅하며 해결하세요.
* 비슷한 구성을 가진 예시 레포지토리는 [여기](https://github.com/9oelM/xrpl-axelar-local-dev)에 있습니다. 이 레포는 로컬 EVM 노드를 Axelar를 통해 XRPL 노드와 연결한 환경을 시뮬레이션하며, 추가적인 서비스들도 포함하고 있습니다.
