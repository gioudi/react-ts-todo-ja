import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../../assets/Hero-image.png';

const LandingScreen: React.FC = () => {
    return (
        <section className="container mx-auto ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col justify-center">
                    <small className="text-secondary mb-1 font-semibold">
                        Necesitas organizarte!
                    </small>
                    <h3 className="text-2xl lg:text-6xl font-bold mb-3">
                        Lista de tareas por hacer
                    </h3>
                    <p className="mb-5">
                        LLave un registro de las tareas que debes
                        hacer de manera facil y sencilla
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link
                            className="bg-primary hover:bg-primary-100 text-white py-2 px-3 rounded-lg text-center  transition"
                            to="/login"
                        >
                            Crear nueva tarea
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center">
                    <img className="w-full lg:max-w-md " src={heroImage} alt="hero" />
                </div>


            </div>
        </section>

    );
};

export default LandingScreen;
