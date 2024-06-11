import download from "../images/download_white.png";
import pdf from "../images/pdf.svg";
import closeIcon from "../images/close.png";
import plan1 from "../images/plan1.png";
import { jsPDF } from "jspdf";
import { createRef, useEffect } from "react";
import axios from "axios";


const Floorplan = (props) => {

  // add a download button to download the generated floor plan
  const downloadFloorPlan = () => {
    const img = document.getElementById("generated_floor_plan");
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "floor_plan.png";
    link.click();
  };

  const downloadFloorPlanPDF = () => {
    // convert image to pdf
    const img = document.getElementById("generated_floor_plan");
    const link = document.createElement("a");
    link.href = img.src;

    const pdfRef = createRef();
    const options = {
      orientation: "landscape",
      unit: "px",
      format: [img.width, img.height],
    };
    const pdf = new jsPDF(options);
    pdf.addImage(img.src, "PNG", 0, 0);
    pdf.save("floor_plan.pdf");
  };

  // Function to calculate the centroid of a polygon
  function calculateCentroid(polygon) {
    let x_min = Infinity;
    let y_min = Infinity;

    let x_max = -Infinity;
    let y_max = -Infinity;
    for (let i = 0; i < polygon.length; i++) {
      x_min = (x_min > polygon[i][0]) ? polygon[i][0] : x_min;
      y_min = (y_min > polygon[i][1]) ? polygon[i][1] : y_min;

      x_max = (x_max < polygon[i][0]) ? polygon[i][0] : x_max;
      y_max = (y_max < polygon[i][1]) ? polygon[i][1] : y_max;
    }
    return [(x_min + x_max) / 2, (y_min + y_max) / 2];
  }


  // Function to draw polygons for a given room type
  function drawPolygons(roomType, polygons, color, id) {
    const svg = document.getElementById(id);
    polygons.forEach(polygon => {
      const points = polygon.map(point => {
        for (let i = 0; i < point.length; i++) {
          point[i] = point[i] * 2;
        }
        return point.join(',');
      }).join(' ');
      console.log("Points are ", points);

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      path.setAttribute('points', points);

      // Example styling, you can customize as needed
      path.setAttribute('fill', color);
      path.setAttribute('stroke', 'white');
      path.setAttribute('stroke-width', '1');

      svg.appendChild(path);

      const centroid = calculateCentroid(polygon);
      console.log("Centroid is ", centroid, " for room type ", roomType);

      // Create a text element for the room type label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', centroid[0] * 0.8); // Adjust for scaling
      text.setAttribute('y', centroid[1]); // Adjust for scaling
      // text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '10');
      text.setAttribute('fill', 'white');
      text.textContent = roomType;

      svg.appendChild(text);
    })
  };
  useEffect(() => {

    try {
      const payload = {
        "featureVector": [
          props.featureVector["NumberofLivingRoom"],
          props.featureVector["NumberofKitchens"],
          props.featureVector["NumberofBathrooms"],
          props.featureVector["NumberofDiningRooms"],
          props.featureVector["NumberofChildrenRooms"],
          props.featureVector["NumberofStudyRooms"],
          props.featureVector["NumberofBalconies"],
          props.featureVector["NumberofStorageRooms"],
          props.featureVector["WidthToLengthRatioofLandPlot"],
          props.featureVector["MaximumLengthofBedroom"],
          props.featureVector["MinimumLengthofBedroom"],
          props.featureVector["MaximumWidthofBedroom"],
          props.featureVector["MinimumWidthofBedroom"],
          props.featureVector["FrontDoorLocationX_axis"],
          props.featureVector["FrontDoorLocationY_axis"],
          props.featureVector["NumberofBedrooms"]
        ]
      };
      axios.post('http://localhost:5000/generateFloorPlan', payload).then((response) => {
        console.log("Floor plan data is ", response.data);
        const floorPlanData = response.data.floorPlan;
        const svg = document.getElementById("floor-plan");
        svg.innerHTML = '';
        for (const roomType in floorPlanData) {
          const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
          const alphaColor = randomColor + '4D'; // Adding '4D' for 30% alpha
          drawPolygons(roomType, floorPlanData[roomType], alphaColor, 'floor-plan');
        }
      });
    } catch (error) {
      console.error('Error fetching floor plan data:', error);
    }
  });

  return (
    <div
      className="h-screen w-screen fixed top-0 left-0 backdrop-blur-xl z-20"
    >
      <button
        className="fixed top-5 right-5 border-0"
        onClick={props.toggleChatOutput}
      >
        <img src={closeIcon} alt="close" className="w-12 h-12" />

      </button>
      <center>
        {/* <img
          id="generated_floor_plan"
          src={plan1}
          className="fixed w-[75vmin] md:top-[12.5%] lg:left-1/4 md:left-[10%] top-1/3 left-[12.5%]"
          //   className="fixed w-[75vmin] md:top-[12.5%] md:left-1/3 top-1/3 left-[12.5%]"
          alt="generated_floor_plan"
        /> */}
        <div className="fixed w-[75vmin] md:top-[12.5%] lg:left-1/4 md:left-[10%] top-1/3 left-[12.5%] ">
          <svg id="floor-plan" width="800" height="800" viewBox="0 0 500 500">

          </svg>
        </div>

      </center>
      <button
        className="fixed bottom-5 right-5 border-0"
        onClick={downloadFloorPlan}
      >
        <img src={download} alt="close" className="w-12 h-12" />
      </button>
      <button
        className="fixed bottom-5 left-5 border-0"
        onClick={downloadFloorPlanPDF}
      >
        <img src={pdf} alt="close" className="w-12 h-12" />
      </button>
    </div>
  );
};

export default Floorplan;