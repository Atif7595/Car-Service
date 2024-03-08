<!DOCTYPE html>
<html lang="en">

@include('frontend.layouts.head')
<body>
    <!-- Spinner Start -->
    <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <!-- Spinner End -->
@include('frontend.layouts.header')

    <!-- Topbar Start -->

    <!-- Navbar End -->

       @yield('content')
    <!-- Testimonial End -->


    <!-- Footer Start -->
        @include('frontend.layouts.footer')
    <!-- Footer End -->


    <!-- Back to Top -->
    <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>


    <!-- JavaScript Libraries -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('frontend_assets/lib/wow/wow.min.js')}}"></script>
    <script src="{{ asset('frontend_assets/lib/easing/easing.min.js')}}"></script>
    <script src="{{ asset('frontend_assets/lib/waypoints/waypoints.min.js')}}"></script>
    <script src="{{ asset('frontend_assets/lib/counterup/counterup.min.js')}}"></script>
    <script src="{{ asset('frontend_assets/lib/owlcarousel/owl.carousel.min.js')}}"></script>
    <script src="{{ asset('frontend_assets/lib/tempusdominus/js/moment.min.js')}}"></script>
    <script src="{{ asset('frontend_assets/lib/tempusdominus/js/moment-timezone.min.js')}}"></script>
    <script src="{{ asset('frontend_assets/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js')}}"></script>

    <!-- Template Javascript -->
    <script src="{{ asset('frontend_assets/js/main.js')}}"></script>
</body>

</html>
