import {useState} from "react";
import axios from "axios";
import {alertaSucess, alertaError, alertaWarning} from "../alertas.js";
import Swal from "sweetalert2";

const useEmpleado = () => {
    const [products, setProducts] = useState([])
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [titleModal, setTitleModal] = useState('')
    const [role, setRole] = useState('')
    const [operation, setOperation] = useState('')
    const url='https://api.escuelajs.co/api/v1/users'


    const getProducts = async () => {
        const response = await axios.get(url)
        setProducts(response.data)

    }

    const openModal = (operation, product) => {
        setId('')
        setName('')
        setEmail('')
        setRole('')

        if (operation === 1) {
            setTitleModal('Registrar Empleado')
        }else if (operation === 2) {
            setTitleModal('Editar Empleado')
            setId(product.id)
            setName(product.name)
            setEmail(product.email)
            setRole(product.role)
        }

        setOperation(operation)

    }


    const enviarSolicitud = async(urlApi,metodo,parametros={}) => {
        let obj={
            method:metodo,
            url:urlApi,
            data:parametros,
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }

        await axios(obj).then(()=>{
            let mensaje = ""
            if (metodo=='POST') {
                mensaje = "Se guardo el producto"
            }else if (metodo=='PUT') {
                mensaje = "Se edito el producto"
            }else if (metodo=='DELETE') {
                mensaje = "Se elimino el producto"
            }
            alertaSucess(mensaje)
            document.getElementById("btnCerrarModal").click()
            getProducts()
        }).catch(error=>{
            alertaError(error.response.data.message)
        })
    }




    const guardarEditarProducto = () => {
        let payload,metodo,urlAxios

        if (name ==='') {
            alertaWarning('Nombre en blanco',name)
        }
        else if(email ==='') {
            alertaWarning('Email en blanco')
        }
        else if(role === '') {
            alertaWarning('Role en blanco')
        }else{
            payload={
                name:name,
                email:email,
                role:role,
                password:12345,
                avatar: "https://i.imgur.com/LDOO4Qs.jpg",
                categoryId:1,
                images:['https://c8.alamy.com/compes/r3yw81/el-icono-de-imagen-no-disponible-vector-plana-r3yw81.jpg']
            }
            if (operation === 1) {
                metodo='POST'
                urlAxios =url
            }else{
                metodo='PUT'
                urlAxios =`${url}/${id}`
            }

            enviarSolicitud(urlAxios,metodo,payload)
        }
    }


    const deleteProducto = async(id) => {
        Swal.fire({
            title:"Esta seguro de eliminar el producto?",
            icon: "question",
            text:"No habra marcha atras",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id)
                enviarSolicitud(`${url}/${id}`,'DELETE')
            }
        }).catch(error => {
            alertaError(error)
        })
    }

    return {
        products,
        getProducts,
        openModal,
        id,
        setId,
        name,
        setName,
        email,
        setEmail,
        role,
        setRole,
        titleModal,
        guardarEditarProducto,
        deleteProducto,
    }


}

export default useEmpleado;