FROM jekyll/jekyll:3.8

WORKDIR /app
RUN chmod -R 777 /app

# Install dependencies. Structured this way to leverage layer caching
COPY ./Gemfile /app/Gemfile
COPY ./Gemfile.lock /app/Gemfile.lock
RUN bundle install

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm install

COPY . /app

CMD npm run build && make serve-docker
