import {computed, reactive, ref} from "vue";
import axios from 'axios';

const state = reactive({
    authenticated: false,
    user: {},
})

export default function useAuth(){

    const  authenticated = computed (()=> state.authenticated );

    const user = computed(()=> state.user);

    const errors = ref({});
    const setAuthenticated = (authenticated) =>{

        state.authenticated = authenticated ;
    };

    const setUser = (user) => {

        state.user = user;
    };

    const attempt = async () => {
        try {

            let response = await axios.get('/api/user');

            setAuthenticated(true);

            setUser(response.data);

            return response;

        }catch (error){

            setAuthenticated(false);

            setUser({});

            console.log("attempt failed: " + error);
        }
    };

    const login = async (form) => {
        try{
            await axios.get('/sanctum/csrf-cookie');

            const response = await axios.post("/login", form);

            // make a request to the backend to grab currently authenticated user
            return attempt();

        }catch (error){
            if(error.response.status === 422){

                errors.value = error.response.data.errors;

                return Promise.reject(null);
            }
        }

        const response = await axios.post('/login', form);

        console.log(response);
    };

    const logout = async () =>{
        try{
            await axios.post('logout');

            setAuthenticated(false);

            setUser({});

        }catch (error){

            return Promise.reject(null);

        }

    };

    return {
        authenticated,
        user,
        login,
        attempt,
        errors,
        logout,
    };
}
