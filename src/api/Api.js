import axios from 'axios';
import Swal from 'sweetalert2';
import localidades from '../constants/localidades.json';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => response,
  err => {
    const { response } = err;

    /*const isLogout = window.location.pathname.includes('logout');
      if (!isLogout && response && response.status === 401) {
        API.goToLogin();
      } else if (response && response.status >= 500) {
        // @TODO: show error page or modal
      }*/
    return Promise.reject(err);
  }
);

class API {
  //Crear campañas
  static async createEvent(form) {
    let path = `/api/events/create/`;
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    const { data } = await axiosInstance.post(path, form, config);
    return data;
  }

  // http://localhost:3000/app/config-account
  // Actualizar campañas de donaciones
  static async updateEvent(id, form) {
    let path = `/api/events/update/${id}/`;
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    const { data } = await axiosInstance.put(path, form, config);
    return data;
  }

  //Obtener campañas
  static async getEvents(page = 1, pageSize = 15, search, state, filters, finished=false) {
    const formattedFilters = filters.map(filter => {
      if (filter === 'Monetaria') return 'Monetary';
      if (filter === 'Fisica') return 'Items';
      if (filter === 'Córdoba') return 'Cordoba';
      return filter;
    });
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    let path = `/api/events/list/?page=${page}&page_size=${pageSize}&filters=${formattedFilters}&finished=${!finished}`;
    if (!!search) {
      path = `${path}&q=${search}`;
    }

    if (typeof state === 'boolean') {
      path = `${path}&cancelled=${state}`;
    }

    const { data } = await axiosInstance.get(path, config);
    return data;
  }

  //Filtro de campaña por Id
  static async getEventById(id) {
    let path = `/api/events/get/${id}/`;
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    const { data } = await axiosInstance.get(path, config);
    return data;
  }

  //Filtro de campaña por Id
  static async getMyEvents(page = 1, pageSize = 10, search) {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    let path = !!search
      ? `/api/events/list/self/?page=${page}&page_size=${pageSize}&q=${search}`
      : `/api/events/list/self/?page=${page}&page_size=${pageSize}`;
    const { data } = await axiosInstance.get(path, config);
    return data;
  }

  //Obtener las categorías posibles de las campañas
  static async getCategories() {
    let path = `/api/events/categories/list/`;
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    const { data } = await axiosInstance.get(path, config);
    return data;
  }

  // Obtener las donaciones registradas para una campaña
  static async getDonationsByEvent(id) {
    let path = `/api/donations/list/by-event/?event=${id}`;
    const { data } = await axiosInstance.get(path);
    return data;
  }

  // Obtener las donaciones realizadas por un usuario
  static async getDonationsByUser(id) {
    let path = `/api/donations/list/by-user/?user=${id}`;
    const { data } = await axiosInstance.get(path);
    return data;
  }

  // Obtener las donaciones de forma general
  static async getDonations() {
    let path = `/api/donations/list/self/`;
    const { data } = await axiosInstance.get(path);
    return data;
  }

  // Generar una donación
  static async createDonation(form) {
    let path = `/api/donations/create/`;
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    const { data } = await axiosInstance
      .post(path, form, config)
      .then(response => {
        window.location.replace(response.data);
        //const openedWindow = window.open(response.data, 'Ohana', 'width=800, height=800');
      });
    return data;
  }

  // Registrar usuario
  static async singUp(form) {
    let path = `/api/auth/signup/`;
    const { data } = await axiosInstance.post(path, form);
    return data;
  }

  static async passwordRecover(username) {
    let path = `/api/auth/recover/?username=${username}`;
    const { data } = await axiosInstance.put(path);
    return data;
  }

  static async changePasswordPin(pin, password) {
    let path = `/api/auth/change-password-pin/?pin=${pin}&password=${password}`
    const { data } = await axiosInstance.put(path);
    return data;
  }


  //login
  static async login(logueo) {
    let path = `/api/auth/signin/`;
    const { data } = await axiosInstance.post(path, logueo);
    return data;
  }

  //logout
  static async logout() {
    let path = `/api/auth/signup/`;
    const { data } = await axiosInstance.post(path);
    return data;
  }

  // Obtener paises
  static async getCountries() {
    const resp = fetch('https://api.first.org/data/v1/countries')
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    return resp;
  }

  // Obtener ciudades
  static async getCities(data) {
    const response = localidades
      .filter(city => city.code === data)
      .map(obj => obj.name);

    return response;
  }

  // Registrar cuenta de mercadopago
  static async createMpAccount(form) {
    let path = `/api/auth/create-mp-account/`;
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    const { data } = await axiosInstance
      .post(path, form, config)
      .then(response => response)
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: 'Ocurrió un error, inténtelo luego!',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => (window.location = '/app/config-account'));
        throw error;
      });
    return data;
  }

  // Obtener cuenta de Mercadopago

  static async getMpAccount() {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    let path = `/api/auth/get-mp-account`;
    const { data } = await axiosInstance.get(path, config);
    return data;
  }

  // Borrar una campaña
  static async deleteCampaign(id) {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    let path = `/api/events/delete/${id}/`;
    const { data } = await axiosInstance.put(path, null, config);
    return data;
  }

  // Estadística Donaciones por Mes
  static async getDonationsByMonth() {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    let path = `/api/stats/donations-by-month/`;
    const { data } = await axiosInstance.get(path, config);
    return data;
  }

  static async getLastDonatedEvents() {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    let path = `/api/stats/last-donated-events/`;
    const { data } = await axiosInstance.get(path, config);
    return data;
  }

  // Obtener data usuario
  static async getInfoUser() {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    let path = `/api/users/info/get/`;
    const { data } = await axiosInstance.get(path, config);
    return data;
  }

  // Actulizar data usuario
  static async updateInfoUser(id, form) {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    let path = `/api/users/info/update/${id}/`;
    const { data } = await axiosInstance.put(path, form, config);
    return data;
  }

  // Obtener el total de donaciones
  static async getTotalDonations() {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    let path = `/api/stats/donations-count/`;
    const { data } = await axiosInstance.get(path, config);
    return data;
  }

  // Obtener el total de campañas suscriptas
  static async getTotalCompaniesSuscribed() {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    let path = `/api/stats/active-events-count/`;
    const { data } = await axiosInstance.get(path, config);
    return data;
  }

  // Obtener el total de campañas suscriptas
  static async getCompaniesEnded() {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    let path = `/api/stats/percentage-finished/`;
    const { data } = await axiosInstance.get(path, config);
    return data;
  }

  static async updateItemStatus(id, done) {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    let path = `/api/events/item/done/`;
    const form = { id, done }; // Form data con id y done
    const { data } = await axiosInstance.put(path, form, config);
    return data;
  }

  static async updateStateLike(id) {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    let path = `/api/events/like/${id}/`;
    const form = {};
    const { data } = await axiosInstance.put(path, form, config);
    return data;
  }

  static async updateStateShare(id) {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    };
    let path = `/api/events/share/${id}/`;
    const form = {};
    const { data } = await axiosInstance.put(path, form, config);
    return data;
  }

  static async exportDonations(idEvent) {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      responseType: 'blob' // Importante para descargar archivos binarios
    };
    let path = `/api/donations/report/?event=${idEvent}`;
    const form = {};
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    // Create a link element, set the download attribute with a filename, and click it
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'donations_report.xlsx';
    link.click();

    // Clean up by revoking the Object URL
    window.URL.revokeObjectURL(link.href);

    const { data } = await axiosInstance.get(path, form, config);
    return data;
  }
}

export default API;
