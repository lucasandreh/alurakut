import { SiteClient } from 'datocms-client';

export default async function comunidades(request, response) {
    if(request.method === "POST") {
        const token = "6e7ef142a8fb507fd65697d229ffbc";
        const client = new SiteClient(token);

        const { title, imageUrl, creatorSlug } = request.body;

        const registroCriado = await client.items.create({
            itemType: "967761",
            title,
            imageUrl,
            creatorSlug
        });

        return response.json({
            registroCriado
        });
    }

        return response.send(`Cannot ${request.method} ${request.url}`);
}