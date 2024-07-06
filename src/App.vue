<template>
  <div id="app" class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 text-center">RSS Reader</h1>
    <form @submit.prevent="fetchRSS" class="mb-4">
      <input
        v-model="rssUrl"
        placeholder="Enter RSS feed URL"
        class="border p-2 rounded w-full mb-2"
      />
      <button type="submit" class="bg-blue-800 text-white p-2 rounded w-full">
        Fetch RSS
      </button>
    </form>
    <div v-if="feed" class="mt-4">
      <h2 class="text-xl font-semibold mb-2">{{ feed.title }}</h2>
      <ul>
        <li v-for="item in feed.items" :key="item.link" class="mb-4">
          <a :href="item.link" target="_blank" class="text-blue-600 font-medium hover:underline">{{ item.title }}</a>
          <div v-html="item.description" class="mt-1"></div>
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
/* No custom styles needed */
</style>
