// // // WorkExperienceSection.js
// // import React from "react";
// // import { Droppable, Draggable } from "react-beautiful-dnd";
// // import DateRange from "../utility/DateRange"; 
// // import DateRangeExperience from "../utility/DateRangeExperience";

// // const WorkExperience = ({ resumeData, headerColor,className = "",
// //   style = {},
// //   itemClassNames = {}, }) => {
// //   if (resumeData.is_fresher ||  !resumeData?.workExperience || resumeData.workExperience.length === 0) {
// //     return null;
// //   }
// // console.log(resumeData?.workExperience,"weee");
// //   return (
// //     <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
// //       {(provided) => (
// //         <div {...provided.droppableProps} ref={provided.innerRef}  style={style}>
// //           <h2
          
// //           className={`${itemClassNames.title || ""}`}
// //             contentEditable
// //             suppressContentEditableWarning
// //             style={{
// //               color: headerColor,
// //               borderBottom: `2px solid ${headerColor}`,
// //             }}
// //           >
// //             Work Experience
// //           </h2>
// //           {resumeData.workExperience.map((item, index) => (
// //             <Draggable
// //               key={`${item.company}-${index}`}
// //               draggableId={`WORK_EXPERIENCE-${index}`}
// //               index={index}
// //             >
// //               {(provided, snapshot) => (
// //                 <div
// //                   ref={provided.innerRef}
// //                   {...provided.draggableProps}
// //                   {...provided.dragHandleProps}
// //                   className={`hover:scale-105 transition-transform duration-300 mb-1 
// //                     ${itemClassNames.content || ""}
// //                     ${
// //                     snapshot.isDragging && "outline-dashed outline-2 outline-gray-400 bg-white"  
// //                   }`}
// //                 >
// //                   <div className="flex flex-row justify-between space-y-1">
// //                     <p  className="font-semibold">{item.company}</p>
// //                     <DateRangeExperience
// //                       startYear={item.startYear}
// //                       endYear={item.endYear}
// //                       id={`work-experience-start-end-date`}
// //                     />
                  
// //                   </div>
                
// //                   <div className="flex flex-row justify-between space-y-1">
// //                                     <p style={{fontWeight:600}}  className="text-gray-700">{item.position}</p>
// //                                     <p style={{fontWeight:600}}  className="text-gray-700" >{item.location}</p>
// //                                   </div>
// //                   {/* <p
// //                     className=" hover:outline-dashed hover:outline-2 hover:outline-gray-400"
// //                     contentEditable="true"
// //                     suppressContentEditableWarning={true}
// //                   >
// //                     {item.description}
                  
// //                   </p> */}
// //                   <p
// //   className="hover:outline-dashed hover:outline-2 hover:outline-gray-400"
// //   contentEditable="true"
// //   suppressContentEditableWarning={true}
// //   dangerouslySetInnerHTML={{ __html: item.description }}
// // ></p>


// //                   {/* <Droppable
// //                     droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
// //                     type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
// //                   >
// //                     {(provided) => (
// //                       <ul
// //                         className="list-disc pl-6"
// //                         {...provided.droppableProps}
// //                         ref={provided.innerRef}
// //                       >
                       
// //                         {item.keyAchievements?
    
// //                           item.keyAchievements
// //                             .map((achievement, subIndex) => (
// //                               <Draggable
// //                                 key={`${item.company}-${index}-${subIndex}`}
// //                                 draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
// //                                 index={subIndex}
// //                               >
// //                                 {(provided, snapshot) => (
// //                                   <li
// //                                     ref={provided.innerRef}
// //                                     {...provided.draggableProps}
// //                                     {...provided.dragHandleProps}
// //                                     className={`hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400 ${
// //                                       snapshot.isDragging &&
// //                                       "outline-dashed outline-2 outline-gray-400 bg-white"
// //                                     }`}
// //                                   >
// //                                     <div
// //                                       dangerouslySetInnerHTML={{
// //                                         __html: achievement,
// //                                       }}
// //                                       contentEditable
// //                                     />
// //                                   </li>
// //                                 )}
// //                               </Draggable>
// //                             )):""
// //                           }
// //                         {provided.placeholder}
// //                       </ul>
// //                     )}
// //                   </Droppable> */}
// //                   {item.keyAchievements && item.keyAchievements.length > 1 && (
// //   <Droppable
// //     droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
// //     type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
// //   >
// //     {(provided) => (
// //       <ul
// //         className="list-disc pl-6"
// //         {...provided.droppableProps}
// //         ref={provided.innerRef}
// //       >
// //         {/* {console.log(item.keyAchievements,"index",index)} */}
// //         {item.keyAchievements.map((achievement, subIndex) => (
          
// //           <Draggable
// //             key={`${item.company}-${index}-${subIndex}`}
// //             draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
// //             index={subIndex}
// //           >
// //             {(provided, snapshot) => (
// //               <li
// //                 ref={provided.innerRef}
// //                 {...provided.draggableProps}
// //                 {...provided.dragHandleProps}
// //                 className={`hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400 ${
// //                   snapshot.isDragging &&
// //                   "outline-dashed outline-2 outline-gray-400 bg-white"
// //                 }`}
// //               >
// //                 <div
// //                   dangerouslySetInnerHTML={{
// //                     __html: achievement,
// //                   }}
// //                   contentEditable
// //                 />
// //               </li>
// //             )}
// //           </Draggable>
// //         ))}
// //         {provided.placeholder}
// //       </ul>
// //     )}
// //   </Droppable>
// // )}

// //                 </div>
// //               )}
// //             </Draggable>
// //           ))}
// //           {provided.placeholder}
// //         </div>
// //       )}
// //     </Droppable>
// //   );
// // };

// // export default WorkExperience;
// // import React from "react";
// // import { Droppable, Draggable } from "react-beautiful-dnd";
// // import DateRange from "../utility/DateRange";
// // import DateRangeExperience from "../utility/DateRangeExperience";

// // const WorkExperience = ({
// //   resumeData,
// //   headerColor,
// //   className = "",
// //   style = {},
// //   itemClassNames = {},
// // }) => {
// //   if (resumeData.is_fresher ||  !resumeData?.workExperience || resumeData.workExperience.length === 0) {
// //     return null;
// //   }
// //   console.log(resumeData?.workExperience,"weee");
// //   return (
// //     <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
// //       {(provided) => (
// //         <div {...provided.droppableProps} ref={provided.innerRef} style={style}>
// //           <h2
// //             className={`${itemClassNames.title || ""}`}
// //             contentEditable
// //             suppressContentEditableWarning
// //             style={{
// //               color: headerColor,
// //               borderBottom: `2px solid ${headerColor}`,
// //             }}
// //           >
// //             Work Experience
// //           </h2>
// //           {resumeData.workExperience.map((item, index) => (
// //             <Draggable
// //               key={`${item.company}-${index}`}
// //               draggableId={`WORK_EXPERIENCE-${index}`}
// //               index={index}
// //             >
// //               {(provided, snapshot) => (
// //                 <div
// //                   ref={provided.innerRef}
// //                   {...provided.draggableProps}
// //                   {...provided.dragHandleProps}
// //                   className={`hover:scale-105 transition-transform duration-300 mb-1 
// //                     ${itemClassNames.content || ""}
// //                     ${
// //                       snapshot.isDragging &&
// //                       "outline-dashed outline-2 outline-gray-400 bg-white"
// //                     }`}
// //                 >
// //                   <div className="flex flex-row justify-between space-y-1">
// //                     <p 
// //                      contentEditable
// //                      suppressContentEditableWarning
// //                     className={`font-semibold`}>
// //                       {item.company}
// //                     </p>
// //                     <DateRangeExperience
// //                       startYear={item.startYear}
// //                       endYear={item.endYear}
// //                       id={`work-experience-start-end-date`}
// //                     />
// //                   </div>

// //                   <div className="flex flex-row justify-between space-y-1">
// //                     <p className={`font-medium`}
// //                       contentEditable
// //                       suppressContentEditableWarning
// //                     >{item.position}</p>
// //                     <p 
// //                      contentEditable
// //                      suppressContentEditableWarning
// //                     className={``}>{item.location}</p>
// //                   </div>
                 
// //                   <p
// //                     className="hover:outline-dashed hover:outline-2 hover:outline-gray-400"
// //                     contentEditable
// //                      suppressContentEditableWarning
// //                     dangerouslySetInnerHTML={{ __html: item.description }}
// //                   ></p>

// //                   {item?.keyAchievements && item.keyAchievements?.length > 0 && (
// //                     <Droppable
// //                       droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
// //                       type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
// //                     >
// //                       {(provided) => (
// //                         <ul
// //                           className="list-disc pl-6"
// //                           {...provided.droppableProps}
// //                           ref={provided.innerRef}
// //                         >
// //                           {/* {console.log(item,"index",index)}
// //                           {item.keyAchievements?.map((achievement, subIndex) => (
// //                             <Draggable
// //                               key={`${item.company}-${index}-${subIndex}`}
// //                               draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
// //                               index={subIndex}
// //                             >
// //                               {(provided, snapshot) => (
// //                                 <li
// //                                   ref={provided.innerRef}
// //                                   {...provided.draggableProps}
// //                                   {...provided.dragHandleProps}
// //                                   className={`hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400 ${
// //                                     snapshot.isDragging &&
// //                                     "outline-dashed outline-2 outline-gray-400 bg-white"
// //                                   }`}
// //                                 >
// //                                   <div
// //                                     dangerouslySetInnerHTML={{
// //                                       __html: achievement,
// //                                     }}
// //                                     contentEditable
// //                                   />
// //                                 </li>
// //                               )}
// //                             </Draggable>
// //                           ))} */}
// //                           {provided.placeholder}
// //                         </ul>
// //                       )}
// //                     </Droppable>
// //                   )}
// //                 </div>
// //               )}
// //             </Draggable>
// //           ))}
// //           {provided.placeholder}
// //         </div>
// //       )}
// //     </Droppable>
// //   );
// // };

// // export default WorkExperience;

// import React from "react";
// import { Droppable, Draggable } from "react-beautiful-dnd";
// import DateRangeExperience from "../utility/DateRangeExperience";

// const WorkExperience = ({
//   resumeData,
//   headerColor,
//   className = "",
//   style = {},
//   itemClassNames = {},
// }) => {
//   if (
//     resumeData.is_fresher ||
//     !resumeData?.workExperience ||
//     resumeData.workExperience.length === 0
//   ) {
//     return null;
//   }

//   return (
//     <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
//       {(provided) => (
//         <div
//           {...provided.droppableProps}
//           ref={provided.innerRef}
//           className={`${className}`}
//           style={style}
//         >
//           <h2
//             className={`${itemClassNames.title || ""}`}
//             contentEditable
//             suppressContentEditableWarning
//             style={{
//               color: headerColor,
//               borderBottom: `2px solid ${headerColor}`,
//             }}
//           >
//             Work Experience
//           </h2>

//           {resumeData.workExperience.map((item, index) => (
//             <Draggable
//               key={`${item.company}-${index}`}
//               draggableId={`WORK_EXPERIENCE-${index}`}
//               index={index}
//             >
//               {(provided, snapshot) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.draggableProps}
//                   {...provided.dragHandleProps}
//                   className={`hover:scale-105 transition-transform duration-300 mb-3 p-2 rounded-md ${
//                     itemClassNames.content || ""
//                   } ${
//                     snapshot.isDragging
//                       ? "outline-dashed outline-2 outline-gray-400 bg-white"
//                       : ""
//                   }`}
//                 >
//                   {/* Top Row: Company & Date */}
//                   <div className="flex justify-between items-center">
//                     <p
//                       contentEditable
//                       suppressContentEditableWarning
//                       className="font-semibold"
//                     >
//                       {item.company}
//                     </p>
//                     <DateRangeExperience
//                       startYear={item.startYear}
//                       endYear={item.endYear}
//                       id={`work-experience-date-${index}`}
//                     />
//                   </div>

//                   {/* Position & Location */}
//                   <div className="flex justify-between items-center">
//                     <p
//                       contentEditable
//                       suppressContentEditableWarning
//                       className="font-medium"
//                     >
//                       {item.position}
//                     </p>
//                     <p
//                       contentEditable
//                       suppressContentEditableWarning
//                     >
//                       {item.location}
//                     </p>
//                   </div>

//                   {/* Description */}
//                   <p
//                     className="hover:outline-dashed hover:outline-2 hover:outline-gray-400 mt-1"
//                     contentEditable
//                     suppressContentEditableWarning
//                     dangerouslySetInnerHTML={{ __html: item.description }}
//                   ></p>

//                   {/* Key Achievements */}
//                   {item?.keyAchievements && item.keyAchievements?.length > 0 && (
//                     <Droppable
//                       droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
//                       type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
//                     >
//                       {(provided) => (
//                         <ul
//                           className="list-disc pl-6 mt-2 space-y-1"
//                           {...provided.droppableProps}
//                           ref={provided.innerRef}
//                         >
//                           {item.keyAchievements?.map((achievement, subIndex) => (
//                             <Draggable
//                               key={`${item.company}-${index}-${subIndex}`}
//                               draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
//                               index={subIndex}
//                             >
//                               {(provided, snapshot) => (
//                                 <li
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                   className={`hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400 p-1 rounded ${
//                                     snapshot.isDragging
//                                       ? "outline-dashed outline-2 outline-gray-400 bg-white"
//                                       : ""
//                                   }`}
//                                 >
//                                   <div
//                                     contentEditable
//                                     suppressContentEditableWarning
//                                     dangerouslySetInnerHTML={{
//                                       __html: achievement,
//                                     }}
//                                   />
//                                 </li>
//                               )}
//                             </Draggable>
//                           ))}
//                           {provided.placeholder}
//                         </ul>
//                       )}
//                     </Droppable>
//                   )}
//                 </div>
//               )}
//             </Draggable>
//           ))}

//           {provided.placeholder}
//         </div>
//       )}
//     </Droppable>
//   );
// };

// export default WorkExperience;
import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DateRangeExperience from "../utility/DateRangeExperience";

const WorkExperience = ({
  resumeData,
  headerColor,
  className = "",
  style = {},
  itemClassNames = {},
}) => {
  if (
    resumeData.is_fresher ||
    !resumeData?.workExperience ||
    resumeData.workExperience.length === 0
  ) {
    return null;
  }

  return (
    <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={className}
          style={style}
        >
          <h2
            className={`${itemClassNames.title || ""}`}
            contentEditable
            suppressContentEditableWarning
            style={{
              color: headerColor,
              borderBottom: `2px solid ${headerColor}`,
            }}
          >
            Work Experience
          </h2>

          {resumeData.workExperience.map((item, index) => (
            <Draggable
              key={`${item.company}-${index}`}
              draggableId={`WORK_EXPERIENCE-${index}`}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`hover:scale-105 transition-transform duration-300 mb-3 p-2 rounded-md ${
                    itemClassNames.content || ""
                  } ${
                    snapshot.isDragging
                      ? "outline-dashed outline-2 outline-gray-400 bg-white"
                      : ""
                  }`}
                >
                  <div className="flex flex-row justify-between space-y-1">
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      className="font-semibold"
                    >
                      {item.company}
                    </p>
                    <DateRangeExperience
                      startYear={item.startYear}
                      endYear={item.endYear}
                      id={`work-experience-start-end-date-${index}`}
                    />
                  </div>

                  <div className="flex flex-row justify-between space-y-1">
                    <p
                      className="font-medium"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      {item.position}
                    </p>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                    >
                      {item.location}
                    </p>
                  </div>

                  <p
                    className="hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                    contentEditable
                    suppressContentEditableWarning
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />

                  {Array.isArray(item?.keyAchievements) &&
                    item.keyAchievements.length > 0 && (
                      <Droppable
                        droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                        type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                      >
                        {(provided) => (
                          <ul
                            className="list-disc pl-6 mt-2"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {item.keyAchievements.map((achievement, subIndex) => (
                              <Draggable
                                key={`ACHIEVEMENT-${index}-${subIndex}`}
                                draggableId={`ACHIEVEMENT-${index}-${subIndex}`}
                                index={subIndex}
                              >
                                {(provided, snapshot) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400 ${
                                      snapshot.isDragging
                                        ? "outline-dashed outline-2 outline-gray-400 bg-white"
                                        : ""
                                    }`}
                                  >
                                    <div
                                      dangerouslySetInnerHTML={{ __html: achievement }}
                                      contentEditable
                                      suppressContentEditableWarning
                                    />
                                  </li>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    )}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default WorkExperience;
