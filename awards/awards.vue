<template>
  <b-container fluid>
        <b-modal id="add_award" title="Add Award" hide-footer size="lg">
      <award-model @refresh = 'getAllAwards' :EditData="editData"></award-model>
    </b-modal>
    <b-row>
      <b-col md="12">
       <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <b-row>
            <b-col lg="12">
              <iq-card>
                <template v-slot:body>
                  <div class="new-user-info">
                    <b-row>
                      <b-form-group class="col-md-6" label="Title:" label-for="user_name">
                        <ValidationProvider name="user_name" rules="required" v-slot="{ errors }">
                          <b-form-input v-model="awardSection.title" type="text"
                                        placeholder="Enter Title Of Sections" :class="(errors.length > 0 ?
                                        ' is-invalid' : '')"></b-form-input>
                          <div class="invalid-feedback">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </b-form-group>
                      <b-form-group class="col-md-6" label="Description:" label-for="title">
                        <ValidationProvider name="title" rules="required" v-slot="{ errors }">
                          <b-form-input v-model="awardSection.description" type="text" placeholder="Enter description"
                                        :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                          <div class="invalid-feedback">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </b-form-group>
                    </b-row>
                    <div class="d-flex  mt-4 align-items-center justify-content-end">
                      <b-button variant="primary" type="submit" v-if="!loadingSubmit">Edit Awards Data</b-button>
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
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" class="mb-2 d-flex justify-content-end">
        <b-button href="#" variant="primary"  v-b-modal.add_award><i class="las la-user-plus"></i>Add Award</b-button>
      </b-col>
      <b-col  md="3"  v-for="(award,key) in allAwards" :key="key">
            <b-card>
              <h5 class="text-primary font-weight-bold">{{award.title}}</h5>
              <h5 class="text-primary font-weight-bold">{{award.description}}</h5>
              <b-card-text>
                <ul>
                  <li v-for="(award2,key2) in award.listing" :key="key2" class="text-primary">{{award2.title}}</li>
                </ul>
              </b-card-text>
              <b-button href="#" class="w-100" variant="primary"  @click="showDataToEdit(allAwards)">Edit</b-button>
            </b-card>
      </b-col>
      <b-card v-if="allAwards.length  == 0" class="w-100 text-primary"> You Should Add Award </b-card>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../../config/pluginInit'
import apis from './services'
import awardModel from './component/award_modal.vue'
export default {
  name: 'awards',
  mounted () {
    core.index()
  },
  components: {
    awardModel
  },
  data () {
    return {
      allAwards: [],
      awardSection: {
        title: '',
        description: ''
      },
      loadingSubmit: false,
      editData: {}
    }
  },
  methods: {
    // onSubmit () {
    //   this.loadingSubmit = true
    //   apis.addMainInfo(this.awardSection).then(res => {
    //     core.showSnackbar('success', res.data.message)
    //   }).finally(() => {
    //     this.loadingSubmit = false
    //   })
    // },
    getAllAwards () {
      apis.getAllAwards().then((res) => {
        this.allAwards = res.data
      })
    },
    showDataToEdit (item) {
      this.editData = item
      this.$bvModal.show('add_award')
    }
  },
  created () {
    this.getAllAwards()
  }
}
</script>
