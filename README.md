## Inspiration

We built this since it's difficult for creators to collect addresses for their projects. We spoke with them and discovered some concerns they were having while making an allowlist for their project. The issues they were facing are:

-   Anyone can easily spam them by creating several accounts.
-   There is no simple way to collect addresses efficiently and select raffle winners.
-   There is no easy way to understand their audience

## What it does

It enables creators to collect addresses quickly and conveniently because everything is managed in a single location.

## How we built it

- For everything relating to the wallet, we use web3-react.
- Firebase is used to store user data.
- Redis for caching.
- We use NFTs for subscriptions so that any creator can use our service whenever they need it and resell it after their project is finished, allowing them to recoup their initial investment. 
- We can also easily gate certain areas of our applications with our NFTs.

## Challenges we ran into

During the development of this application, we discovered that two smart contracts on two separate chains can have the same address.

We had a lot of problems connecting Walletconnect because it didn't work for Testnets by default, so we had to tweak the internals.


## Accomplishments that we're proud of

Incorporating NFT support into the software.
 
We are in a new era when NFT is the next big thing in Web3, yet we all know that a simple NFT project with no utilities will not succeed.

So adding value in the form of a decent utility is crucial, and that is what we hope to accomplish with our project.

This project, and what we've contributed so far, is just the start, and it's a great illustration of how we can integrate the software with NFT and make it worthwhile to hold.

## What we learned


We're both new to this space, and the prospect of writing our smart contract and deploying it on the Polygon Mainnet is daunting.

Using Canva and Figma, we created and designed our NFT pass.

We had some challenges with incorporating the complete website and gating with NFTs, but in the end, we built what we wanted and learned a lot in the process.

## What's next for Allowlist

The features we have so far are only a small part of what we believe we can offer. We're going to create a slew of tools to assist creators/artists in obtaining the finest possible allowlist for their projects.

What's next:

- Using Twitter and Discord to authorize projects so that users can't spam their allowlist

- Filtering users with multiple accounts automatically by keeping track of their transaction activities

- Adding support for multiple wallets to the login process

- A tool that allows the creators to obtain a sense of how their mint day would appear by gathering information about the addresses that register on our site


***

## NOTES:

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


### TODO:
  - show error if chainId is wrong "in this case chainID = 80001"




### Contract 

> https://polygonscan.com/address/0x7dfE584536C439DaE59198Ac13691Eabf06B35fd#code
