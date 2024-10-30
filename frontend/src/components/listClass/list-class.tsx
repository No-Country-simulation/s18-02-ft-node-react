import BadgeIcon from "@/icons/badge-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import ListClassFilterCard from "../list-class-filter-card/list-class-filter-card";

interface Base {
    // Define aquí cualquier propiedad común que desees que otras interfaces extiendan
}

interface Clase extends Base {
    id: string;
    nombre: string;
    idioma: string;
    hora: string;
    avatar: string;
    fecha: string;
    createdAt: Date;
    updatedAt: Date;
}

export default function ListClass() {
    const [selectedId, setSelectedId] = useState(null);

    // Función que establece el alumno seleccionado
    const handleSelect = (id) => {
        setSelectedId(selectedId === id ? null : id);
    };

    const clases: Clase[] = [
        {
            id: "1",
            hora: "09:00",
            nombre: "Mr Mario",
            idioma: "español",
            avatar: "https://www.lavanguardia.com/files/image_449_220/files/fp/uploads/2023/01/21/63cbb2e286998.r_d.534-311-6101.png",
            fecha: "2024-10-29T15:30:00Z",
            createdAt: new Date("2002-02-11"),
            updatedAt: new Date("2002-02-11")
        },
        {
            id: "2",
            hora: "10:00",
            nombre: "Julio Gomes",
            idioma: "ingles",
            fecha: "2024-10-27T15:30:00Z",
            avatar: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj5TRT5o2zoHv5DtuPNLYtujQCAr4uUu6dDkti73vHfUjtFUdOLO7qu639VOX_ZXcaFb4ASa12u0OLlG9MP_KUCY-hv2CMI4WTRLuA2lLVYgryl3ot86x_VKaSf87_5o8kfgoDuHIFQFRm45KuE--KBK1VACLuD4doOvWv1dujJQDEpnpQC3w/s512/00015-2782668338-Highly%20detailed%20portrait%20of%20eldm,%20stephen%20bliss,%20unreal%20engine,%20fantasy%20art%20by%20greg%20rutkowski,%20loish,%20rhads,%20ferdinand%20knab,%20mak.png",
            createdAt: new Date("2002-02-11"),
            updatedAt: new Date("2002-02-11")
        },
        {
            id: "3",
            hora: "11:00",
            nombre: "Juan Fernando",
            idioma: "español",
            fecha: "2024-10-28T15:30:00Z",
            avatar: "https://f.rpp-noticias.io/2019/02/15/753296descarga-7jpg.jpg",
            createdAt: new Date("2002-02-11"),
            updatedAt: new Date("2002-02-11")
        },
    ];
    
    return (
        <>
            <ul className=" flex flex-col gap-3 items-center hidden">
                {clases.map((alumno) => (
                    <li
                        onClick={() => handleSelect(alumno.id)}
                        className="w-72 h-[58px] flex bg-border rounded-md"
                        key={alumno.id}>
                        <p className="h-[58px] w-16 flex fon justify-center items-center">{alumno.hora}</p>
                        <div className={`flex w-60 items-center justify-between bg-background rounded-md cursor-pointer ${selectedId === alumno.id ? 'hidden' : ''
                            }`}>
                            <div className="flex items-center space-x-3 m-3">
                                <Avatar>
                                    <AvatarImage className="w-10 h-10 rounded-full" src={alumno.avatar} />
                                    <AvatarFallback />
                                </Avatar>
                                <ul>
                                    <h2>{alumno.nombre}</h2>
                                    <p className="text-xs text-border">{alumno.idioma}</p>
                                </ul>
                            </div>
                            <i className="m-3">
                                <BadgeIcon />
                            </i>
                        </div>
                        <div className={`flex w-[76%] justify-end items-center text-muted-foreground ${selectedId === alumno.id ? '' : 'hidden'
                            }`}>
                            <button className="flex items-center justify-center w-28 h-8 border rounded-md border-muted-foreground">
                                <p>Eliminar</p>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

                <ListClassFilterCard/>
        </>
    )
}