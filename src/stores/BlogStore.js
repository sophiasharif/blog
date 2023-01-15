import {defineStore } from 'pinia'

export const useBlogStore = defineStore('blogStore', {
    state: () => ({
        title: "",
        subtitle: "",
        content: "",
        coverPhotoName: "",
        coverPhotoURL: "",
        previewEnabled: false
    })
})