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

- Update the register page and check all logic are working or not -HOLD

- Alerts Notifications - DONE

- Update pages with component if it is small - HOLD

- Adding permission for premium services 

- Images using Image component

- Code optimization
- Create pass NFT art 


- `if (chainId == 4 && library.connection.url != "metamask") {
      library.provider.http.connection.url = INFURA_RINKEBY_URL;
    }`

    > NOTE: have to update this code based on the chain we choose to go live on


- Finally Creating bad ass UI 
