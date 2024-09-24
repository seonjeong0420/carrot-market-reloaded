import React from "react";

type Props = {};

/**
 * [id]/page.tsx -> 단 하나의 parameter url을 나타낸다.
 *
 * catch all segments
 * [...slug]/page.tsx -> 원하는 만큼의 parameter 적용이 가능
 * ex) localhost:3000/extras/1/2/3/4/5/6/7 접속 가능
 *
 * optional catch all segments
 * [[...id]]/page.tsx -> parameter가 없어도 접속 가능
 *
 */
const ExtrasSlug = ({ params }: { params: { slug: string[] } }) => {
  console.log(params);

  return (
    <div>
      <h1>Catch All Segments</h1>
      <p>Extra slug page</p>
    </div>
  );
};

export default ExtrasSlug;
