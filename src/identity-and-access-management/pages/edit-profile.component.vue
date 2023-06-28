<template>
  <div class="container">
    <div class="Profile">Profile</div>
    <div class="content">
      <div class="content-container">
        <div class="section">
          <div class="item">
            <div class="label">Photo</div>
            <div class="value">
              <template v-if="editMode.image">
                <div>
                  <InputText v-model="formData.image" type="text" class="p-inputtext-sm" placeholder="Small" />
                  <Button class="cancelButton" size="small" icon="pi pi-times" severity="danger" rounded aria-label="Cancel" @click="cancelChanges('image')"/>
                  <Button class="confirmButton" size="small" icon="pi pi-check" severity="success" rounded aria-label="Filter" @click="saveChanges('image')"/>
                </div>
              </template>
              <template v-else>
                <div class="image-container">
                  <Image :src="formData.image" alt="Profile image" preview/>
                  <Button class="editButton" label="Edit" size="small" severity="secondary" @click="toggleEdit('image')" outlined></Button>
                </div>
              </template>
            </div>
          </div>
        </div>
        <Divider type="solid" />

        <div class="section">
          <div class="item">
            <div class="label">Name</div>
            <div class="value">
              <template v-if="!editMode.firstName">
                {{ formData.firstName }}
                <Button class="editButton" label="Edit" size="small" severity="secondary" @click="toggleEdit('firstName')" outlined></Button>
              </template>
              <template v-else>
                <InputText v-model="formData.firstName" type="text" class="p-inputtext-sm" placeholder="Small" />
                <Button class="cancelButton" size="small" icon="pi pi-times" severity="danger" rounded aria-label="Cancel" @click="cancelChanges('firstName')"/>
                <Button class="confirmButton" size="small" icon="pi pi-check" severity="success" rounded aria-label="Filter" @click="saveChanges('firstName')"/>
              </template>
            </div>
          </div>
          <Divider type="solid" />
        </div>

        <div class="section">
          <div class="item">
            <div class="label">Last Name</div>
            <div class="value">
              <template v-if="!editMode.lastName">
                {{ formData.lastName }}
                <Button class="editButton" label="Edit" size="small" severity="secondary" @click="toggleEdit('lastName')" outlined></Button>
              </template>
              <template v-else>
                <InputText v-model="formData.lastName" type="text" class="p-inputtext-sm" placeholder="Small" />
                <Button class="cancelButton" size="small" icon="pi pi-times" severity="danger" rounded aria-label="Cancel" @click="cancelChanges('lastName')"/>
                <Button class="confirmButton" size="small" icon="pi pi-check" severity="success" rounded aria-label="Filter" @click="saveChanges('lastName')"/>
              </template>
            </div>
          </div>
          <Divider type="solid" />
        </div>

        <div class="section">
          <div class="item">
            <div class="label">Gender</div>
            <div class="value">
              <template v-if="!editMode.gender">
                {{ formData.gender }}
                <Button class="editButton" label="Edit" size="small" severity="secondary" @click="toggleEdit('gender')" outlined></Button>
              </template>
              <template v-else>
                <InputText v-model="formData.gender" type="text" class="p-inputtext-sm" placeholder="Small" />
                <Button class="cancelButton" size="small" icon="pi pi-times" severity="danger" rounded aria-label="Cancel" @click="cancelChanges('gender')"/>
                <Button class="confirmButton" size="small" icon="pi pi-check" severity="success" rounded aria-label="Filter" @click="saveChanges('gender')"/>
              </template>
            </div>
          </div>
          <Divider type="solid" />
        </div>

        <div class="section">
          <div class="item">
            <div class="label">Phone</div>
            <div class="value">
              <template v-if="!editMode.phoneNumber">
                {{ formData.phoneNumber }}
                <Button class="editButton" label="Edit" size="small" severity="secondary" @click="toggleEdit('phoneNumber')" outlined></Button>
              </template>
              <template v-else>
                <InputText v-model="formData.phoneNumber" type="text" class="p-inputtext-sm" placeholder="Small" />
                <Button class="cancelButton" size="small" icon="pi pi-times" severity="danger" rounded aria-label="Cancel" @click="cancelChanges('phoneNumber')"/>
                <Button class="confirmButton" size="small" icon="pi pi-check" severity="success" rounded aria-label="Filter" @click="saveChanges('phoneNumber')"/>
              </template>
            </div>
          </div>
          <Divider type="solid" />
        </div>

        <Button>
          <li class="navbar-link" style="list-style: none">
            <router-link to="/subscription" style="text-decoration: none; color: #fff">Subscribe</router-link>
          </li>
        </Button>
      </div>
    </div>
  </div>

</template>

<script>
import {AccountService} from "@/request-service-management/service/account-service";
import {EditProfileService} from "@/identity-and-access-management/service/edit-profile.service";

export default {
  data() {
    return {
      editMode: {
        image: false,
        firstName: false,
        lastName: false,
        gender: false,
            phoneNumber: false,
        },
      formData: {
        image: "",
        firstName: "",
        lastName: "",
        gender: "",
        phoneNumber: "",
      },
      accountService: null,
      editProfileService: null,
      originalData: {},
    };
  },
  created() {
    this.editProfileService = new EditProfileService();
    this.editProfileService.profileByUserId(this.$route.params.id).then(res=> {
      this.formData = res.data;
      console.log(this.formData.image);
    })
  },

  methods: {
    toggleEdit(field) {
      this.editMode[field] = !this.editMode[field];
      if (this.editMode[field]) {
        this.originalData[field] = this.formData[field];
      }
    },
    saveChanges(field) {
      this.toggleEdit(field);
      console.log(JSON.stringify(this.formData))
      this.editProfileService.updateProfileByUserId(this.$route.params.id, JSON.stringify(this.formData), this.formData).then(response=>{
        console.log(response)
      })
    },
    cancelChanges(field) {
      this.toggleEdit(field);
      if (this.originalData[field] !== undefined) {
        this.formData[field] = this.originalData[field];
      } else {
        this.formData[field] = null;
      }
    },
  },
};
</script>

<style>
.container {
  display: block;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-top: 140px;
  margin: 0 100px;
}

.Profile {
  display: flex;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  justify-content: center;
}

.content {
  width: 100%;
  justify-content: center;
  padding-bottom: 50px;
}

.content-container {
  margin: 0 20px; /* Añade el margen horizontal al contenido */
}

.section {
  width: 100%;
}

.item {
  display: flex;
  align-items: center;
}

.label {
  flex: 1;
  margin-right: 16px;
}

.value {
  display: flex;
  align-items: center;
}

.editButton {
  margin-left: 15px;
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
}

.image-container {
  display: flex;
  align-items: center;
  justify-items: center;
}

.image-container img {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 100px;
}

@media (max-width: 600px) {
  .item {
    flex-direction: column;
    align-items: flex-start;
  }

  .label {
    margin-bottom: 8px;
  }

  .editButton {
    margin-top: 8px;
    margin-left: 0;
  }

  @media (max-width: 600px) {
  }
}
.cancelButton {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  margin-left: 8px;
}

.confirmButton {
  background: none;
  border: none;
  color: green;
  cursor: pointer;
  margin-left: 8px;
}
</style>