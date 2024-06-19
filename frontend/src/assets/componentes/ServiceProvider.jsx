export function ServiceProvider ({userName,name,service,location,rating,price}){
    return (
        <article className="sp-card">
            <header className="sp-card-header">
                <img 
                className="sp-card-avatar"
                src={`https://unavatar.io/${userName}`} 
                alt="Avatar de usuario" />
            <div className="sp-card-info">
                <strong>{name}</strong>
                <span className="sp-card-data">
                    {service}
                </span>
                <span className="sp-card-data">
                    {location}
                </span>
            </div>
            <aside className="sp-card-rightdata">
                <span className="sp-card-rightdata-text">
                    {rating} stars
                </span>
                <span className="sp-card-rightdata-text">
                    ${price}
                </span>
                <span className="sp-card-rightdata-text">
                    por dia
                </span>
            </aside>
            </header>
        </article>
    )
}