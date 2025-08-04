# Spiff Search

This is a Calvin and Hobbes search engine using Typesense Search. Images are stored in /app/images in the Docker container.

To run this:

1.  Put images into the "images" folder, with the format `YYYY-MM-DD.EXT`, such as `1985-11-18.gif`.
2. Generate a random API key with `openssl rand -hex 32` in the terminal, then enter it
2. Open a terminal and type `docker compose up`.

TODO: Add instructions for setting up Typesense
