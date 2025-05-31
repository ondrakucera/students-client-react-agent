# Students client React application, created by and AI agent

This project serves as an experiment with an AI agent in Cursor.

I started by copying the `students-server-restapi-node` directory (containing a REST API around a student entity) and
the `vzor` directory (containing static HTML files of the expected result) from another project of mine.

I then asked the agent to create a React CRUD application around the student entity, based on the HTML files in `vzor`
and the OpenAPI description of the REST API in `students-server-restapi-node/students.yaml`. Every commit records the
result of a single prompt (or, in some cases, several related prompts) and the prompt is shown in the commit message.
