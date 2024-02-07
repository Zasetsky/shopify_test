import React, { useEffect, useRef } from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface ProductItemProps {
  bodyHtml: string;
  imageUrl: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ bodyHtml, imageUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const image = new Image();
        image.onload = () => {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
        image.src = imageUrl;
      }
    }
  }, [imageUrl]);

  const parser = new DOMParser();
  const doc = parser.parseFromString(bodyHtml, "text/html");
  // Предполагаю, что описание содержится в первом параграфе
  const description = doc.querySelector("p")?.textContent || "";

  return (
    <Card
      sx={{ width: "100%", height: "100%", flexDirection: "column", mb: 2 }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "auto" }}
      />
      <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
