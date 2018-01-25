# Name of Project

Hustle is a full-stack web application that connects individuals managing projects with potential collaborators on a social media dashboard. It provides the users with opportunities to view:

a)	Other users' skill sets, project histories, and availability for work
b)	Outstanding projects requiring users with a given skill set and availability.

The primary purpose of the platform is to facilitate initial touchpoints between project managers and potential collaborators. 


## Built With

●	Node.js
●	Express.js
●	JavaScript
●	AngularJS
●	AngularJS Material
●	PostgreSQL
●	Nodemailer
●	Filestack
●	Facebook SDK
●	Google Oauth 2.0
●	Google Places API
●	Post GIS


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- List other prerequisites here


### Installing

Steps to get the development environment running.

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);
```

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] Feature a
- [x] Feature b

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Name of author(s)


## Acknowledgments

* Hat tip to anyone who's code was used
