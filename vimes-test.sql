PGDMP      9            	    {            quanlykho_db    16.0    16.0 4    #           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            $           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            %           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            &           1262    16397    quanlykho_db    DATABASE     �   CREATE DATABASE quanlykho_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Japanese_Japan.1252';
    DROP DATABASE quanlykho_db;
                postgres    false            '           0    0    DATABASE quanlykho_db    COMMENT     6   COMMENT ON DATABASE quanlykho_db IS 'quản lý kho';
                   postgres    false    4902            �            1259    16417    employee_positions    TABLE     o   CREATE TABLE public.employee_positions (
    employee_id integer NOT NULL,
    position_id integer NOT NULL
);
 &   DROP TABLE public.employee_positions;
       public         heap    postgres    false            �            1259    16402 	   employees    TABLE     w   CREATE TABLE public.employees (
    employee_id integer NOT NULL,
    employee_name character varying(255) NOT NULL
);
    DROP TABLE public.employees;
       public         heap    postgres    false            �            1259    16401    employees_employee_id_seq    SEQUENCE     �   CREATE SEQUENCE public.employees_employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.employees_employee_id_seq;
       public          postgres    false    216            (           0    0    employees_employee_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.employees_employee_id_seq OWNED BY public.employees.employee_id;
          public          postgres    false    215            �            1259    16409 	   positions    TABLE     w   CREATE TABLE public.positions (
    position_id integer NOT NULL,
    position_name character varying(255) NOT NULL
);
    DROP TABLE public.positions;
       public         heap    postgres    false            �            1259    16408    positions_position_id_seq    SEQUENCE     �   CREATE SEQUENCE public.positions_position_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.positions_position_id_seq;
       public          postgres    false    218            )           0    0    positions_position_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.positions_position_id_seq OWNED BY public.positions.position_id;
          public          postgres    false    217            �            1259    16433    products    TABLE       CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_name character varying(255) NOT NULL,
    description text,
    quantity_stock integer,
    last_updated timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    product_id_name character varying(255)
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16432    products_product_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.products_product_id_seq;
       public          postgres    false    221            *           0    0    products_product_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;
          public          postgres    false    220            �            1259    16443    receipts    TABLE     >  CREATE TABLE public.receipts (
    receipts_id integer NOT NULL,
    receipts_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    delivery_persons character varying(255),
    created_by_employee_id integer,
    warehouse_employee_id integer,
    accounttant_employee_id integer,
    receipts_notes text
);
    DROP TABLE public.receipts;
       public         heap    postgres    false            �            1259    16468    receipts_details    TABLE     _  CREATE TABLE public.receipts_details (
    detail_id integer NOT NULL,
    receipts_id integer NOT NULL,
    product_id integer NOT NULL,
    actual_quantity integer NOT NULL,
    unit_price numeric(24,6) NOT NULL,
    total_value numeric(30,6) GENERATED ALWAYS AS ((unit_price * (actual_quantity)::numeric)) STORED NOT NULL,
    unit_type character varying(50) NOT NULL,
    in_debt boolean NOT NULL,
    receiving_unit character varying(255) NOT NULL,
    receiving_department character varying(255) NOT NULL,
    document_quantity integer NOT NULL,
    receiving_place character varying(255) NOT NULL
);
 $   DROP TABLE public.receipts_details;
       public         heap    postgres    false            �            1259    16467    receipts_details_detail_id_seq    SEQUENCE     �   CREATE SEQUENCE public.receipts_details_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.receipts_details_detail_id_seq;
       public          postgres    false    225            +           0    0    receipts_details_detail_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.receipts_details_detail_id_seq OWNED BY public.receipts_details.detail_id;
          public          postgres    false    224            �            1259    16442    receipts_receipts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.receipts_receipts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.receipts_receipts_id_seq;
       public          postgres    false    223            ,           0    0    receipts_receipts_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.receipts_receipts_id_seq OWNED BY public.receipts.receipts_id;
          public          postgres    false    222            h           2604    16405    employees employee_id    DEFAULT     ~   ALTER TABLE ONLY public.employees ALTER COLUMN employee_id SET DEFAULT nextval('public.employees_employee_id_seq'::regclass);
 D   ALTER TABLE public.employees ALTER COLUMN employee_id DROP DEFAULT;
       public          postgres    false    215    216    216            i           2604    16412    positions position_id    DEFAULT     ~   ALTER TABLE ONLY public.positions ALTER COLUMN position_id SET DEFAULT nextval('public.positions_position_id_seq'::regclass);
 D   ALTER TABLE public.positions ALTER COLUMN position_id DROP DEFAULT;
       public          postgres    false    217    218    218            j           2604    16436    products product_id    DEFAULT     z   ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);
 B   ALTER TABLE public.products ALTER COLUMN product_id DROP DEFAULT;
       public          postgres    false    221    220    221            l           2604    16446    receipts receipts_id    DEFAULT     |   ALTER TABLE ONLY public.receipts ALTER COLUMN receipts_id SET DEFAULT nextval('public.receipts_receipts_id_seq'::regclass);
 C   ALTER TABLE public.receipts ALTER COLUMN receipts_id DROP DEFAULT;
       public          postgres    false    223    222    223            n           2604    16471    receipts_details detail_id    DEFAULT     �   ALTER TABLE ONLY public.receipts_details ALTER COLUMN detail_id SET DEFAULT nextval('public.receipts_details_detail_id_seq'::regclass);
 I   ALTER TABLE public.receipts_details ALTER COLUMN detail_id DROP DEFAULT;
       public          postgres    false    224    225    225                      0    16417    employee_positions 
   TABLE DATA           F   COPY public.employee_positions (employee_id, position_id) FROM stdin;
    public          postgres    false    219   �B                 0    16402 	   employees 
   TABLE DATA           ?   COPY public.employees (employee_id, employee_name) FROM stdin;
    public          postgres    false    216   �B                 0    16409 	   positions 
   TABLE DATA           ?   COPY public.positions (position_id, position_name) FROM stdin;
    public          postgres    false    218   cC                 0    16433    products 
   TABLE DATA           x   COPY public.products (product_id, product_name, description, quantity_stock, last_updated, product_id_name) FROM stdin;
    public          postgres    false    221   �C                 0    16443    receipts 
   TABLE DATA           �   COPY public.receipts (receipts_id, receipts_date, delivery_persons, created_by_employee_id, warehouse_employee_id, accounttant_employee_id, receipts_notes) FROM stdin;
    public          postgres    false    223   D                  0    16468    receipts_details 
   TABLE DATA           �   COPY public.receipts_details (detail_id, receipts_id, product_id, actual_quantity, unit_price, unit_type, in_debt, receiving_unit, receiving_department, document_quantity, receiving_place) FROM stdin;
    public          postgres    false    225   �D       -           0    0    employees_employee_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.employees_employee_id_seq', 17, true);
          public          postgres    false    215            .           0    0    positions_position_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.positions_position_id_seq', 1, false);
          public          postgres    false    217            /           0    0    products_product_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.products_product_id_seq', 3, true);
          public          postgres    false    220            0           0    0    receipts_details_detail_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.receipts_details_detail_id_seq', 11, true);
          public          postgres    false    224            1           0    0    receipts_receipts_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.receipts_receipts_id_seq', 10, true);
          public          postgres    false    222            w           2606    16421 *   employee_positions employee_positions_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.employee_positions
    ADD CONSTRAINT employee_positions_pkey PRIMARY KEY (employee_id, position_id);
 T   ALTER TABLE ONLY public.employee_positions DROP CONSTRAINT employee_positions_pkey;
       public            postgres    false    219    219            q           2606    16407    employees employees_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (employee_id);
 B   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_pkey;
       public            postgres    false    216            s           2606    16414    positions positions_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_pkey PRIMARY KEY (position_id);
 B   ALTER TABLE ONLY public.positions DROP CONSTRAINT positions_pkey;
       public            postgres    false    218            u           2606    16416 %   positions positions_position_name_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_position_name_key UNIQUE (position_name);
 O   ALTER TABLE ONLY public.positions DROP CONSTRAINT positions_position_name_key;
       public            postgres    false    218            y           2606    16441    products products_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    221            {           2606    16486 %   products products_product_id_name_key 
   CONSTRAINT     k   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_product_id_name_key UNIQUE (product_id_name);
 O   ALTER TABLE ONLY public.products DROP CONSTRAINT products_product_id_name_key;
       public            postgres    false    221                       2606    16474 &   receipts_details receipts_details_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.receipts_details
    ADD CONSTRAINT receipts_details_pkey PRIMARY KEY (detail_id);
 P   ALTER TABLE ONLY public.receipts_details DROP CONSTRAINT receipts_details_pkey;
       public            postgres    false    225            }           2606    16451    receipts receipts_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.receipts
    ADD CONSTRAINT receipts_pkey PRIMARY KEY (receipts_id);
 @   ALTER TABLE ONLY public.receipts DROP CONSTRAINT receipts_pkey;
       public            postgres    false    223            �           2606    16422 6   employee_positions employee_positions_employee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employee_positions
    ADD CONSTRAINT employee_positions_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id);
 `   ALTER TABLE ONLY public.employee_positions DROP CONSTRAINT employee_positions_employee_id_fkey;
       public          postgres    false    4721    216    219            �           2606    16427 6   employee_positions employee_positions_position_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employee_positions
    ADD CONSTRAINT employee_positions_position_id_fkey FOREIGN KEY (position_id) REFERENCES public.positions(position_id);
 `   ALTER TABLE ONLY public.employee_positions DROP CONSTRAINT employee_positions_position_id_fkey;
       public          postgres    false    4723    219    218            �           2606    16462 .   receipts receipts_accounttant_employee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.receipts
    ADD CONSTRAINT receipts_accounttant_employee_id_fkey FOREIGN KEY (accounttant_employee_id) REFERENCES public.employees(employee_id);
 X   ALTER TABLE ONLY public.receipts DROP CONSTRAINT receipts_accounttant_employee_id_fkey;
       public          postgres    false    4721    216    223            �           2606    16452 -   receipts receipts_created_by_employee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.receipts
    ADD CONSTRAINT receipts_created_by_employee_id_fkey FOREIGN KEY (created_by_employee_id) REFERENCES public.employees(employee_id);
 W   ALTER TABLE ONLY public.receipts DROP CONSTRAINT receipts_created_by_employee_id_fkey;
       public          postgres    false    223    4721    216            �           2606    16480 1   receipts_details receipts_details_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.receipts_details
    ADD CONSTRAINT receipts_details_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);
 [   ALTER TABLE ONLY public.receipts_details DROP CONSTRAINT receipts_details_product_id_fkey;
       public          postgres    false    4729    221    225            �           2606    16475 2   receipts_details receipts_details_receipts_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.receipts_details
    ADD CONSTRAINT receipts_details_receipts_id_fkey FOREIGN KEY (receipts_id) REFERENCES public.receipts(receipts_id);
 \   ALTER TABLE ONLY public.receipts_details DROP CONSTRAINT receipts_details_receipts_id_fkey;
       public          postgres    false    4733    225    223            �           2606    16457 ,   receipts receipts_warehouse_employee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.receipts
    ADD CONSTRAINT receipts_warehouse_employee_id_fkey FOREIGN KEY (warehouse_employee_id) REFERENCES public.employees(employee_id);
 V   ALTER TABLE ONLY public.receipts DROP CONSTRAINT receipts_warehouse_employee_id_fkey;
       public          postgres    false    216    223    4721               9   x�%��	  �w��&����~��-#�8����鱥-阃!��R�� � �
B         ]   x���)z�ky�Bؑ�<�<.CT.CCg.C#.CcN�ëB2��i0A�:q�r���V>�ݚ+)0Ci�*������ ]99         2   x�3�L�-�ɯLM�2�,O,J��/-N�2�LLN�/�+)I�+����� ,3O         b   x�eʱ�0��=��8����	�����@�
�+O1m�Ш�2���eP)����A���U�\�Vd_��Y�c���-8c&:ϩ.2� [�s         �   x�}˻�0 ��<E�u�;�n�H�La�� ��4.h^�"8t<�$yEV�6r���-��N�
$@���؞�`R�D%Yvч�7�.rR\�G�^�6 Z�
a�
.'���e���Xc�36�          w   x���4�4BS=0�L>�0�3����t��JG�����)T�>ܵ��Ӕ3��J�#����� _���%�!P�Mwr~~zHw�gvF>�	�.CN�Fc��Q��`hC�,F��� ?M-     