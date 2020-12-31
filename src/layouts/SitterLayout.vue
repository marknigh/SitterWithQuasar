<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          {{ currentLocation }}
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img :src="currentUser.photoURL ? currentUser.photoURL : '../assets/inside-a-circle-reverse.png'">
            </q-avatar>
          </q-item-section>
          <q-item-section>
              <q-item-label>{{ currentUser.name }} </q-item-label>
              <q-item-label caption>{{ currentUser.email }} </q-item-label>
          </q-item-section>

        </q-item>

        <q-separator/>

        <q-item clickable tag="a" target="_blank" @click.native="profile()">
          <q-item-section avatar>
            <q-icon name="eva-person-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
            <q-item-label caption>Your Profile Information</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" @click.native="listParents()">
          <q-item-section avatar>
            <q-icon name="eva-people-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Parents</q-item-label>
            <q-item-label caption>All Active Parents</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" @click.native="listJobs()">
          <q-item-section avatar>
            <q-icon name="eva-briefcase-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Jobs</q-item-label>
            <q-item-label caption>Active Jobs</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" @click.native="listReviews()">
          <q-item-section avatar>
            <q-icon name="eva-edit-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Reviews</q-item-label>
            <q-item-label caption>Reviews Written About You</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="!currentUser" clickable tag="a" target="_blank" @click.native="signIn()">
          <q-item-section avatar>
            <q-icon name="eva-log-in-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sign In</q-item-label>
            <q-item-label caption>Sign In to Your Account</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-else clickable tag="a" target="_blank" @click.native="signOut()">
          <q-item-section avatar>
            <q-icon name="eva-log-out-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sign Out</q-item-label>
            <q-item-label caption>Sign Out of your Account</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { signOutAuth } from '../utils/auth'

export default {
  name: 'SitterLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.getCurrentUser
    },
    currentLocation () {
      return this.$store.getters.getCurrentLocation
    }

  },
  methods: {
    listParents () {
      this.$router.push('/sitter/parents')
    },
    listJobs () {
      this.$router.push('/sitter/jobs')
    },
    profile () {
      this.$router.push('/sitter/profile')
    },
    listReviews () {
      this.$router.push('/sitter/reviews')
    },
    signIn () {
      this.$router.push('/')
    },
    signOut () {
      signOutAuth()
      this.$store.commit('clearUser')
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
