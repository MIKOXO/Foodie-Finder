import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

type FeaturesCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const FeaturesCard = ({
  icon: Icon,
  title,
  description,
}: FeaturesCardProps) => {
  return (
    <div>
      <Card className="text-center">
        <CardContent className="p-6">
          <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturesCard;
