### Legends:

- ??? = "Should we do this?"

### Code format:

- use arrow functions
- use template strings
- place exports at last

### Notes:

- login with wallets
- form to create raffels
- public page my users share with there community
  - those pages have this feature to connecte there wallets and register to the project

### Pages:

- login
- home -> "About and public projects"
- dashboard -> "Show list of projects(mine)"
- profile -> "Show the wallet, email, and social accounts (twitter and discord)"
- joined lists -> "Show the lists of projects that the user has joined"

### Database:

- profile

  - wallet
    - name
    - address
    - isMintingWallet
  - email
    - anti-phishing code
  - social accounts
    - twitter
    - discord

- project info

  - name
  - description
  - image
  - banner image
  - link
  - slug
  - created_at
  - updated_at
  - mint info
    - date
    - time
    - spots
    - price
  - isPrivate

- registration flow

  - wallet requirements
    - require eth balance
    - require to have nft collection ???
  - twitter verification ???
  - discord verification ???
  - require reCaptcha ???
  - confirmation message

- signup access

  - password ???
  - registration start datetime
  - registration end datetime
  - max entries
  - ban entries ???

- transparency

  - public wallet list
  - public winner list

- raffle

  - raffle datetime
  - winner message
  - non-winner message
  - waitlist message

- api ???

- duplicate project ???

- multiple projects ???

- NoSQL or RDBMS ???


## TODO

- Add require and checks for forms - DONE

- Update the register page and check all logic are working or not - DONE

- Alerts Notifications - DONE

- Update pages with component if it is small - HOLD

- Adding permission for premium services 
    > Current Features we'll build
      - To create more then 1 project you must have our NFT
      - show only <= 100 register users data 
      - provide random winner for raffels you need our NFT

    > PRO
      - user Insights data // PRO
      - Prevent Bots &   // PRO currently filter out wallets from same IP
        - more Robust solutions        


- Images using Image component - DONE

- Create pass NFT art  - DONE


- `if (chainId == 4 && library.connection.url != "metamask") {
      library.provider.http.connection.url = INFURA_RINKEBY_URL;
    }`

    > NOTE: have to update this code based on the chain we choose to go live on
    - HALF DONE 

- Code optimization

- Finally Creating bad ass UI 


### Pros and cons on ETH and polygon

> ETH testnets pros:
  - no checking for wallets
  - widely known
  - 
> ETH testnets cons:
  - Have to deploy on testnets
  - seems less serious

> polygon pros:
  - can deploy on mainnet
  - seems more legit project

> polygon pros:
  - lot of checks for wallets




### WHAT??

> https://blockscan.com/address/0xBfa680c93e14880af7F4b67ad43e0bF36F9741d6