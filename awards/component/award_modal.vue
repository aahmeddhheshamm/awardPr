<template>
  <b-container fluid>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col lg="12">
            <iq-card>
              <template v-slot:body>
                <div class="new-user-info">
                  <b-row>
                    <b-form-group class="col-md-12" label="Title:" label-for="title">
                      <ValidationProvider name="title" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="award.title" type="text" placeholder="Enter title"
                                      :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="Description:" label-for="title">
                      <ValidationProvider name="description" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="award.description" type="text" placeholder="Enter description"
                                      :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="Listing:" label-for="info">
                      <ValidationProvider name="info" rules="required" v-slot="{ errors }" >
                          <div class=" d-flex justify-content-between align-items-center">
                          <b-form-input  class="col-md-7" v-model="award.listing[0].title"
                                        type="text"
                                        placeholder="Enter info"
                                         :class="(errors.length > 0 ? ' is-invalid' : '')">
                          </b-form-input>
                          <b-form-input  class="col-md-2 " v-model="award.listing[0].color"
                                         type="color">
                          </b-form-input>
                          <div class=" col-md-2">
                            <b-button variant="success" @click="addNewInput"><i class="las la-plus"></i></b-button>
                          </div>
                        </div>
                          <div class="invalid-feedback d-block w-100">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider v-for="(i,key) in award.listing.slice(1)"
                                          :key="key+i"
                                          name="listing"
                                          rules="required"
                                          v-slot="{
                        errors }">
                        <div class="mt-2 d-flex justify-content-between align-items-center">
                            <b-form-input
                              v-model="award.listing[key+1].title"
                              type="text"
                              :key="key+i"
                              placeholder="Enter info"
                              class="col-md-7"
                              :class="[errors.length > 0 ? ' is-invalid' : '','mt-1']">
                            </b-form-input>
                            <b-form-input
                            v-model="award.listing[key+1].color"
                            type="color"
                            :key="key+1"
                            placeholder="Enter info"
                            class="col-md-2">
                          </b-form-input>
                            <div class="col-md-2">
                              <b-button variant="danger"  @click="removeInput(key+1)"
                                      v-if="award.listing"><i
                                class="las la-minus"></i></b-button>
                            </div>
                        </div>
                        <div class="invalid-feedback  d-block w-100">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                  </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-end">
                    <b-button variant="primary" type="submit" v-if="!loadingSubmit">Add Award</b-button>
                    <b-button v-else class="btn btn-primary float-right" variant="primary" disabled>
                      <b-spinner small type="grow"></b-spinner>
                      Loading...
                    </b-button>
                  </div>
                </div>
              </template>
            </iq-card>
          </b-col>
        </b-row>
      </form>
    </ValidationObserver>
  </b-container>
</template>
<script>
import { core } from '../../../../config/pluginInit'
import apis from '../services'
export default {
  name: 'award_modal',
  mounted () {
    core.index()
  },
  props: {
    EditData: {
      type: Object
    }
  },
  data () {
    return {
      loadingSubmit: false,
      award: {
        title: '',
        description: '',
        listing: [{
          title: '',
          color: '#000000'
        }]
      }
    }
  },
  methods: {
    onSubmit () {
      this.loadingSubmit = true
      apis.addAward(this.award).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$emit('refresh')
        this.$bvModal.hide('add_award')
      }).finally(() => {
        this.loadingSubmit = false
      })
    },
    addNewInput () {
      this.award.listing.push({
        title: '',
        color: '#000000'
      })
    },
    removeInput (index) {
      this.award.listing.splice(index, 1)
    }
  },
  created () {
    if (!this.EditData) {
      this.award = this.EditData
    }
  }
}
</script>
<style scoped>
.btn i {
  margin-right: 0 !important;
}
</style>
