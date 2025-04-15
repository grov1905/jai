interface ServiceCardProps {
    icon: string;
    title: string;
    description: string;
    className?: string;
    onClick?: () => void;
  }
  
  export default function ServiceCard({ 
    icon, 
    title, 
    description, 
    className = '', 
    onClick 
  }: ServiceCardProps) {
    return (
      <div 
        className={`bg-white p-6 rounded-lg shadow-md flex-1 min-w-[250px] max-w-[350px] ${className}`}
        onClick={onClick}
      >
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-primary text-xl font-semibold mb-3">{title}</h3>
        <p className="text-primary/80">{description}</p>
      </div>
    );
  }