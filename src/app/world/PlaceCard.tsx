import Link from "next/link";
// this creates a reusable place card component 
// that can be used to display information about 
// different places in the world. 
// It takes in three props: name, icon, and description,
// which are used to populate the card's content. 
// The component is structured as a button, allowing for potential interactivity, 
// such as navigation or selection.
type PlaceCardProps = {
    name: string; 
    icon: string; 
    description: string; 
    href: string;
}; 

export default function PlaceCard({
    name, 
    icon, 
    description, 
    href,
}: PlaceCardProps) {
    return ( 
        <Link href={href}>
            <div>{icon}</div>
            <h2>{name}</h2>
            <p>{description}</p>
        </Link>
    );
}