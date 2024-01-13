import React from "react";
import './Home.css'
import Product from "./Product";

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src="https://img.freepik.com/free-photo/side-view-woman-holding-smartphone-shopping-bags-cyber-monday_23-2148657647.jpg?w=1380&t=st=1705107150~exp=1705107750~hmac=affaa64e8f7b9943e4db25a8f8d59d6c3ac6813bf6e3615b3a18ac674d107cc6" />
                <div className="home__row">
                    <Product title='Szlifiera' price={249.99} image='https://boschcentrum.pl/img/3660/szlifierka-katowa-gws-2200-230-professional.jpg' rating={5}/>
                    <Product title='Szlifiera' price={249.99} image='https://boschcentrum.pl/img/3660/szlifierka-katowa-gws-2200-230-professional.jpg' rating={5}/>
                </div>

                <div className="home__row">
                <Product title='Szlifiera' price={249.99} image='https://boschcentrum.pl/img/3660/szlifierka-katowa-gws-2200-230-professional.jpg' rating={5}/>
                <Product title='Szlifiera' price={249.99} image='https://boschcentrum.pl/img/3660/szlifierka-katowa-gws-2200-230-professional.jpg' rating={5}/>
                <Product title='Szlifiera' price={249.99} image='https://boschcentrum.pl/img/3660/szlifierka-katowa-gws-2200-230-professional.jpg' rating={5}/>
                </div>

                <div className="home__row">
                <Product title='Szlifiera' price={249.99} image='https://boschcentrum.pl/img/3660/szlifierka-katowa-gws-2200-230-professional.jpg' rating={5}/>
                <Product title='Szlifiera' price={249.99} image='https://boschcentrum.pl/img/3660/szlifierka-katowa-gws-2200-230-professional.jpg' rating={5}/>
                </div>
            </div>
        </div>
    )
}

export default Home