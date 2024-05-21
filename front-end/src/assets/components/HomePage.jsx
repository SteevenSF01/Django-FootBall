import CardHomeEquipe from "./CardHomeEquipe"
import CardHomeJoueur from "./CardHomeJoueur"

export default function HomePage() {
    return (
        <>
            <section className="mt-10">
                <h1 className="text-white text-center text-4xl ">Les joueurs sans équipes</h1>
                <CardHomeJoueur />
            </section>
            <section className="mt-10">
                <h1 className="text-white text-center text-4xl ">Les équipes remplies</h1>
                <CardHomeEquipe />
            </section>
        </>
    )
}
