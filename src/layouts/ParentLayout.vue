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
            <q-avatar color="primary" text-color="white" icon="eva-person-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ currentUser.name }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-separator/>
        <q-item clickable tag="a" target="_blank" @click.native="profile()">
          <q-item-section avatar>
            <q-icon name="eva-info-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
            <q-item-label caption>Your Profile Information</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" @click.native="listSitters()">
          <q-item-section avatar>
            <q-icon name="eva-people-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sitters</q-item-label>
            <q-item-label caption>All Active Sitters</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" @click.native="listJobs()">
          <q-item-section avatar>
            <q-icon name="eva-briefcase-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Jobs</q-item-label>
            <q-item-label caption>Your Active Jobs</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" @click.native="signOut()">
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
import { getAuth } from 'firebase/auth'

export default {
  name: 'ParentLayout',
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
    listSitters () {
      this.$router.push('/parent/sitters')
    },
    listJobs () {
      this.$router.push('/parent/jobs')
    },
    profile () {
      this.$router.push('/parent/profile')
    },
    signIn () {
      this.$router.push('/')
    },
    signOut () {
      getAuth().signOut()
      this.$store.commit('clearUser')
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
