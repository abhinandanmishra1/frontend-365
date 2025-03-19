interface ProfileCardProps {
    name: string;
    age: number;
    location: string;
    profilePicture: string;
    followers: number;
    likes: number;
    photosCount: number;
}

const ProfileCard = ({
    name,
    age,
    location,
    profilePicture,
    followers,
    likes,
    photosCount
}: ProfileCardProps) => {
    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num.toString();
    };

    return (
        <div className="rounded-lg overflow-hidden shadow-lg bg-white max-w-sm">
            <div className="bg-cyan-400 p-6 relative" style={{ 
                backgroundImage: "radial-gradient(circle at 10px 10px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 5%, transparent 5%)",
                backgroundSize: "30px 30px"
            }}>
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
                    <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
                        <img 
                            src={profilePicture} 
                            alt={`${name}'s profile`} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
            
            <div className="pt-16 pb-6 px-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    {name} <span className="text-gray-400 font-normal">{age}</span>
                </h2>
                <p className="text-gray-500 mb-6">{location}</p>
                
                <div className="flex justify-between">
                    <div className="text-center px-4">
                        <p className="text-xl font-bold text-gray-800">{formatNumber(followers)}</p>
                        <p className="text-gray-500 text-sm">Followers</p>
                    </div>
                    <div className="text-center px-4">
                        <p className="text-xl font-bold text-gray-800">{formatNumber(likes)}</p>
                        <p className="text-gray-500 text-sm">Likes</p>
                    </div>
                    <div className="text-center px-4">
                        <p className="text-xl font-bold text-gray-800">{formatNumber(photosCount)}</p>
                        <p className="text-gray-500 text-sm">Photos</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Project19() {
    return (
        <div className="max-w-7xl mx-auto p-4 pt-6 bg-gradient-to-br from-cyan-500 to-cyan-700 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-white mb-8">Project 19: Profile Card</h1>
            
            <ProfileCard 
                name="Victor Crest"
                age={26}
                location="London"
                profilePicture="/api/placeholder/200/200" // Using placeholder as we can't use external images
                followers={80000}
                likes={803000}
                photosCount={1400}
            />
        </div>
    );
}
