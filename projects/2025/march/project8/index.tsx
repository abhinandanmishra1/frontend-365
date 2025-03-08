import { Avatar } from "../project5";

interface TestimonialCardProps {
  profile: string;
  name: string;
  username: string;
  testimonial: string;
}

export const TestimonialCard = ({
  name,
  profile,
  username,
  testimonial,
}: TestimonialCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-4 mb-4">
        <Avatar src={profile} alt={name}/>
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-900">{name}</h1>
          <h4 className="text-sm text-gray-500">@{username}</h4>
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-7 from-accent-foreground">{testimonial}</p>
    </div>
  );
};

export default function Project8() {
  const testimonials = [
    {
      name: "Niranjan Singh",
      username: "niranjansingh",
      profile: "https://randomuser.me/api/portraits/men/1.jpg",
      testimonial:
        "Abhinandan is a great developer. He is very professional and always delivers on time. His motivation towards development and mindset towards solving problems is commendable.",
    },
    {
      name: "Aarav Patel",
      username: "aaravpatel",
      profile: "https://randomuser.me/api/portraits/men/2.jpg",
      testimonial:
        "Working with Abhinandan has been an amazing experience. His expertise in frontend and backend is top-notch, and his problem-solving skills are impressive.",
    },
    {
      name: "Sanya Gupta",
      username: "sanyagupta",
      profile: "https://randomuser.me/api/portraits/women/3.jpg",
      testimonial:
        "Abhinandan's attention to detail and ability to deliver scalable solutions make him stand out. His deep understanding of React and system design is inspiring!",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        What People Say
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
}
