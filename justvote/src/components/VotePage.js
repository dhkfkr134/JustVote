import React from 'react';
import * as RBS from "react-bootstrap";
import { useParams } from "react-router-dom";

import testImage from '../img/content_img.png';


export default function VotePage() {
    class Test {
        constructor(name, date, voter, content) {
            this.name = name;
            this.date = date;
            this.voter = voter;
            this.content = content;
        }

    }
    let test = new Test(
        "제목",
        "2021.05.11",
        1500,
        ["추억과 김밥", "밀알 식당", "논두렁 갈비"]
    );

    const { nam } = useParams();


    function VoteTop() {
        return (
            <div className="VotePage">
                <h1>{test.name}{nam}</h1>
                <h5>{test.date} | {test.voter}명</h5>
                <RBS.Col xs={6} md={4}>
                    {/* ../public/content_img.png 이라고 해도 되지만 위치몰라도 고를 수 있는걸 보여주고 싶었음*/}
                    <RBS.Image src={testImage} rounded />
                </RBS.Col>

            </div>
        )
    }

    function contentList() {

        return <ul className="list_content">
            {test.content.map((item, index) => (
                <tr key={index}>
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>
                        <div>Content{index + 1}  {item}</div>
                    </td>

                </tr>
            ))}
        </ul>
    }

    return (
        <div className="VotePage">

            <RBS.Container>
                <RBS.Row>
                    <RBS.Col>
                        <VoteTop></VoteTop>
                    </RBS.Col>
                    <RBS.Col>
                        {/* <div style="position: absolute; right: 0px; bottom: 0px;">
                          안녕하세요!!!
                        </div> */}
                    </RBS.Col>
                </RBS.Row>
            </RBS.Container>
            {contentList()}

        </div>
    )
}