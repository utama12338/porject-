import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import DetailMappingCheckBox from '../components/ola-custom/DetailMappingCheckBox';
import DetailMappingDesc from '../components/ola-custom/DetailMappingDesc';
import { render,screen  } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom for extended matchers

describe('Test DetailMapping Component', () => {
    it('Testing DetailMappingCheckBox Renders', async () => {
      const mockDeatils = ['H1_เพื่อการลงทุนประกอบอาชีพ','H1_ดอกเบี้ยต่ำ','H1_ใช้ บยส. ค้ำประกัน'];
      render(<DetailMappingCheckBox detail={mockDeatils}/>)
      const contentElement = screen.getByTestId('text-load-detail-เพื่อการลงทุนประกอบอาชีพ');
      expect(contentElement).toBeInTheDocument();
      expect(contentElement).toHaveTextContent("เพื่อการลงทุนประกอบอาชีพ");

    });

    it('Testing DetailMappingCheckBox Renders Not Data', async () => {
      const mockDeatils = ['H2_เพื่อการลงทุนประกอบอาชีพ'];
      render(<DetailMappingCheckBox detail={mockDeatils}/>)
      const contentElement = screen.queryByText('เพื่อการลงทุนประกอบอาชีพ');
      expect(contentElement).not.toBeInTheDocument();

    });

    it('Testing DetailMappingDesc Renders', async () => {
      const mockDeatils = ['H1_วงเงินกู้','D1_50,000 บาท','H1_ระยะเวลาชำระคืนเงินกู้','D1_ตั้งแต่ 3 ปี สูงสุด 5 ปี'];
      render(<DetailMappingDesc detail={mockDeatils}/>)
      const contentElementHeader = screen.getByTestId('text-load-detail-วงเงินกู้');
      expect(contentElementHeader).toBeInTheDocument();
      expect(contentElementHeader).toHaveTextContent("วงเงินกู้");

      const contentElementDetail = screen.getByTestId('text-load-detail-50,000 บาท');
      expect(contentElementDetail).toBeInTheDocument();
      expect(contentElementDetail).toHaveTextContent("50,000 บาท");

    });


    it('Testing DetailMappingDesc Renders Not Data', async () => {
      const mockDeatils = ['H2_ระยะเวลาชำระคืนเงินกู้','D3_ตั้งแต่ 3 ปี สูงสุด 5 ปี'];
      render(<DetailMappingDesc detail={mockDeatils}/>)
      const contentElementHeader = screen.queryByText('ระยะเวลาชำระคืนเงินกู้');
      expect(contentElementHeader).not.toBeInTheDocument();

      const contentElementDetail = screen.queryByText('ตั้งแต่ 3 ปี สูงสุด 5 ปี');
      expect(contentElementDetail).not.toBeInTheDocument();

    });


    it('Testing DetailMappingDesc Renders For Check URL MRR', async () => {
      const mockDeatils = ['H1_อัตราดอกเบี้ยและค่าทำเนียม','D1_อัตราดอกเบี้ย คลิกที่นี่', ];
      render(<BrowserRouter><DetailMappingDesc detail={mockDeatils}/></BrowserRouter>)
      const contentElementHeader = screen.getByTestId('text-load-detail-อัตราดอกเบี้ย คลิกที่นี่');
      expect(contentElementHeader).toBeInTheDocument();

    });

    it('Testing DetailMappingDesc Renders For Check URL FEE', async () => {
      const mockDeatils = ['H1_อัตราดอกเบี้ยและค่าทำเนียม','D1_ค่าธรรมเนียม คลิกที่นี่', ];
      render(<BrowserRouter><DetailMappingDesc detail={mockDeatils}/></BrowserRouter>)
      const contentElementHeader = screen.getByTestId('text-load-detail-ค่าธรรมเนียม คลิกที่นี่');
      expect(contentElementHeader).toBeInTheDocument();

    });

    it('Testing DetailMappingDesc Renders For Check URL FEE', async () => {
      const mockDeatils = ['H1_รายละเอียด','D1_50,000 บาท','D2_ตั้งแต่ 3 ปี สูงสุด 5 ปี'];
      render(<BrowserRouter><DetailMappingDesc detail={mockDeatils}/></BrowserRouter>)
      const contentElementHeader = screen.getByTestId('text-load-detail-ตั้งแต่ 3 ปี สูงสุด 5 ปี');
      expect(contentElementHeader).toBeInTheDocument();

    });
});