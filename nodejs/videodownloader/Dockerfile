FROM node:18

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libnss3 \
    libdbus-1-3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxcomposite1 \
    libxrandr2 \
    libxdamage1 \
    libxkbcommon0 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libasound2 \
    libxshmfence1 \
    libgbm1 \
    libgtk-3-0 \
    libx11-xcb1 \
    libxss1 \
    libxtst6 \
    libnss3-dev \
    libx11-dev \
    libx11-xcb-dev \
    libxcb1-dev \
    libxcomposite-dev \
    libxrandr-dev \
    libxdamage-dev \
    libxkbcommon-dev \
    libpango1.0-dev \
    libpangocairo-1.0 \
    libasound2-dev \
    libxshmfence-dev \
    libgbm-dev \
    libgtk-3-dev \
    libx11-xcb-dev \
    libxss-dev \
    libxtst-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Chrome
RUN apt-get update && apt-get install -y wget gnupg

# Install python 2.7 interpreter
RUN apt-get install -y python3.2
RUN ln -s /usr/bin/python3 /usr/bin/python

# Install ffmpeg
RUN apt-get install -y ffmpeg

# Download and install Google Chrome
RUN wget -q -O /tmp/google-chrome-stable_current_amd64.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get update && apt-get install -y /tmp/google-chrome-stable_current_amd64.deb

# Clean up
RUN rm /tmp/google-chrome-stable_current_amd64.deb

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Update youtube-dl permission
RUN chmod a+rx /app/tools/youtube-dl
RUN hash -r

EXPOSE 3000

CMD [ "node", "app.js" ]