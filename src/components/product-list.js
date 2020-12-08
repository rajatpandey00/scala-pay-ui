import { NavLink } from "react-bootstrap";

export const Products = () => {
	return (
		<div className="col-25">
			<div className="container">
				<h4>
					Cart{" "}
					<span className="price" style={{ color: "black" }}>
						<i className="fa fa-shopping-cart"></i> <b>4</b>
					</span>
				</h4>
				<p>
					<NavLink href="#">Product 1</NavLink>{" "}
					<span className="price">$15</span>
				</p>
				<p>
					<NavLink href="#">Product 2</NavLink>{" "}
					<span className="price">$5</span>
				</p>
				<p>
					<NavLink href="#">Product 3</NavLink>{" "}
					<span className="price">$8</span>
				</p>
				<p>
					<NavLink href="#">Product 4</NavLink>{" "}
					<span className="price">$2</span>
				</p>
				<hr />
				<p>
					Total{" "}
					<span className="price" style={{ color: "black" }}>
						<b>$30</b>
					</span>
				</p>
			</div>
		</div>
	);
};

export default Products;