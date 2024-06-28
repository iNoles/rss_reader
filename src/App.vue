<template>
  <div id="app">
    <h1>Vue.js RSS Reader</h1>
    <form @submit.prevent="fetchRSS">
      <input v-model="rssUrl" placeholder="Enter RSS feed URL" />
      <button type="submit">Fetch RSS</button>
    </form>
    <div v-if="feed">
      <h2>{{ feed.title }}</h2>
      <ul>
        <li v-for="item in feed.items" :key="item.link">
          <a :href="item.link" target="_blank">{{ item.title }}</a>
          <div v-html="item.description"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface FeedItem {
  title: string
  link: string
  description: string
}

interface Feed {
  title: string
  items: FeedItem[]
}

export default defineComponent({
  name: 'App',
  setup() {
    const rssUrl = ref<string>('')
    const feed = ref<Feed | null>(null)

    const fetchRSS = async () => {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl.value}`)
        const data = await response.json()
        feed.value = {
          title: data.feed.title,
          items: data.items.map((item: any) => ({
            title: item.title,
            link: item.link,
            description: item.description
          }))
        }
      } catch (error) {
        console.error('Error fetching RSS feed:', error)
      }
    }

    return {
      rssUrl,
      feed,
      fetchRSS
    }
  }
})
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

form {
  margin-bottom: 20px;
}

input {
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}
</style>
