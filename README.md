# graph UI
## [<ins>Click here to go to the graph UI</ins>](https://dh6w98htdyw4.cloudfront.net/)

As a user, I would like to see the hierarchy of the provided data.
ACCEPTANCE CRITERIA
• Clicking one of the nodes, displays the detail of that node.
o Selected node should be visible on the layout
o Description and the name should be visible in a
sidebar or popup

• Hierarchy should be visible and understandable by the user
• Tree layout could be from top to right or left to right
• User should be able to deselect a node. (In the sample design, user can click the
cross icon and deselect it)

Requirements:
• This assignment should contain the source files in one repository.
• You can read the data from a database or copy the data into your code.
• As a data store we recommend you to use graph database you are comfortable with.
• We expect from you to create a express.js server which has a GET endpoint which
serves the data with correct hierarchy.
• Read the data from database and serve it to frontend with JSON format.
• Read the data from Backend via GET endpoint
• Please feel free to use a front-end visualization library like D3.js.
• You can use plain VanillaJS or VueJS in the Frontend and Node.js or Python in the Backend
• Usage of TypeScript, Sass, Webpack is your consideration



design decisions:

- cloud
The infrastructure will be build in AWS...
The infrastructure will be completely serverless, since the usage of the application will be ...

- backend
will be written in node.js, since a requirement stated to use express.js

- frontend
will be written using VueJS, to allow the codebase to be easioly extendible with new features.

- database
We will use AWS Neptune as our graph database and use a provisioned db.t3.medium instance, to make use of AWS free-tier.