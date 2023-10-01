import React from "react"
import "./Header.scss"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

type TypeOnChangeMonthFunction = () => void

type TypeHeaderProps = {
	currentMoment: any //!!!!!!!!!!!!!!!!!!!!!!
	onPrevMonth: TypeOnChangeMonthFunction
	onNextMonth: TypeOnChangeMonthFunction
}

export default function Header({ currentMoment, onPrevMonth, onNextMonth }: TypeHeaderProps) {
	return (
		<div className="header">
			<div className="header__wrapper">
				<IoIosArrowBack
					className="header__arrowBtn header__arrowBtn-left"
					onClick={() => onPrevMonth()}
				/>
				<h1 className="header__date">{currentMoment.format("MMM YYYY")}</h1>
				<IoIosArrowForward
					className="header__arrowBtn header__arrowBtn-right"
					onClick={() => onNextMonth()}
				/>
			</div>
		</div>
	)
}
