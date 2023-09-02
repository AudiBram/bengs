import Container from "@/components/ui/container";
import Billboard from "@/components/ui/billboard";
import getBillboard from "@/actions/get-billboard";

export const revalidate = 0;

const HomePage = async () => {
    const billboard = await getBillboard("ec249584-9a96-4d45-8b77-593808490c46");

    return (
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard} />
            </div>
        </Container>
    )
}

export default HomePage;